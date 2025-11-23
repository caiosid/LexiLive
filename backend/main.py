from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, constr
from passlib.context import CryptContext
import asyncpg
from contextlib import asynccontextmanager
import os
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import cv2
from jose import jwt
from datetime import datetime, timedelta
import pyopencl as cl
import numpy as np
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
import string
from pydantic import BaseModel, EmailStr

# Configuração email
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "lexi.live.see@gmail.com"   
EMAIL_PASSWORD = "tyvw elqk ulah fjsa"    
RESET_TOKEN_EXPIRE_MINUTES = 15

# Configuração do JWT
SECRET_KEY = "NddtUw5EKT3N?++"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



# Função para gerar token


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Dependência para proteger rotas
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


model = YOLO("best.pt")  # <-- path to your model

# Configuração do Neon
DATABASE_URL = os.getenv(
    "DATABASE_URL", 'postgresql://neondb_owner:npg_1VpXQlR7FAzt@ep-patient-tooth-a8keey1o-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require')

# Hash de senha
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

class EmailRequest(BaseModel):
    email: EmailStr


async def get_pool():
    return await asyncpg.create_pool(DATABASE_URL)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.pool = await get_pool()
    yield
    await app.state.pool.close()

app.router.lifespan_context = lifespan

# Gerador de senha aleatória
def generate_random_password(length: int = 10) -> str:
    chars = string.ascii_letters + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


@app.post("/register")
async def register(user: UserCreate):
    try:
        # bcrypt direto, truncando para 72 bytes
        password_bytes = user.password.encode("utf-8")[:72]
        hashed_pw = bcrypt.hashpw(
            password_bytes, bcrypt.gensalt()).decode("utf-8")

        query = """
        INSERT INTO app.users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id;
        """
        async with app.state.pool.acquire() as conn:
            user_id = await conn.fetchval(query, user.name, user.email, hashed_pw)
        return {"id": user_id, "message": "Usuário cadastrado com sucesso!"}
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Email já existe.")
    except Exception as e:
        print("Erro detalhado:", e)
        raise HTTPException(
            status_code=500, detail="Erro interno do servidor.")

# Login com geração de token


@app.post("/login")
async def login(user: UserLogin):
    try:
        query = "SELECT id, password_hash FROM app.users WHERE email = $1;"
        async with app.state.pool.acquire() as conn:
            row = await conn.fetchrow(query, user.email)

        if row is None:
            raise HTTPException(
                status_code=401, detail="Email incorreto ou não cadastrado.")

        stored_hash = row["password_hash"]
        password_bytes = user.password.encode("utf-8")[:72]

        if not bcrypt.checkpw(password_bytes, stored_hash.encode("utf-8")):
            raise HTTPException(
                status_code=401, detail="Email ou senha incorretos.")

        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print("Erro ao autenticar:", e)
        raise HTTPException(
            status_code=500, detail="Erro interno do servidor.")


# teste se API está funcionando
@app.get("/")
async def main():
    return {"status": "running"}

# Uso do detect sem openCL(pyopenCL)
@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)):
    
    print("Arquivo recebido:", file.filename, file.content_type)
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    results = model(image)

    detections = []
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            x1, y1, x2, y2 = map(float, box.xyxy[0])
            detections.append({
                "class": model.names[cls_id],
                "confidence": conf,
                "bbox": [x1, y1, x2, y2]
            })

    return JSONResponse(content={"detections": detections})


# --- inicializar pyopencl - detecta a primeira CPU identificada e cria contexto - se não roda error ---
# def get_opencl_context():
#     for platform in cl.get_platforms():
#         if "NVIDIA" in platform.name or "Intel" in platform.name:
#             devices = platform.get_devices(device_type=cl.device_type.GPU)
#             if devices:
#                 print(f"Using OpenCL on: {platform.name} - {devices[0].name}")
#                 return cl.Context(devices=devices)
#     raise RuntimeError("No OpenCL GPU device found.")

# ctx = get_opencl_context()
# # Cria fila de comandos para o contexto kernels e operações na GPU
# queue = cl.CommandQueue(ctx)

# """
#  kernel para copiar imagem
#  __global -> variável global
#  const -> Kernel não modifica a origem
#  uchar -> caractere sem sinal em C/OpenCL equivalente a um inteiro de 8 bits sem sinal
#  dst -> destino da foto
#  get_global_id(0) -> pega o ID do trabalho em andamento
# """
# COPY_KERNEL = """
# __kernel void copy_image(__global const uchar *src, __global uchar *dst) {
#     int i = get_global_id(0);
#     dst[i] = src[i];
# }
# """

# # Compila o código para GPU
# program = cl.Program(ctx, COPY_KERNEL).build()

# def copy_with_opencl(image: np.ndarray) -> np.ndarray:
#     """Copia imagem com GPU."""
#     # diminui dimensão com o flatten
#     img_flat = image.flatten()
#     output = np.empty_like(img_flat)
#     mf = cl.mem_flags
# # coloca flag de somente ler - aloca buffer da GPU
#     src_buf = cl.Buffer(ctx, mf.READ_ONLY | mf.COPY_HOST_PTR, hostbuf=img_flat)
#     # aloca memória vazia para ser escrita
#     dst_buf = cl.Buffer(ctx, mf.WRITE_ONLY, output.nbytes)


#     # prepara a instrução de copiar imagem
#     program.copy_image(queue, img_flat.shape, None, src_buf, dst_buf)
#     """ Roda N threads de GPU:
#         thread 0 → copia src[0]
#         thread 1 → copia src[1]
#         ...
#         thread N-1 → copia src[N-1]"""
#     cl.enqueue_copy(queue, output, dst_buf)
# # retorna imagem 2D
#     return output.reshape(image.shape)

@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_np = np.array(image)

    # Usando OpenCL para copiar com GPU
    img_np_gpu = copy_with_opencl(img_np)

    # Converte para PIL
    image_gpu = Image.fromarray(img_np_gpu)

    results = model(image_gpu)

    detections = []
    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            x1, y1, x2, y2 = map(float, box.xyxy[0])
            detections.append({
                "class": model.names[cls_id],
                "confidence": conf,
                "bbox": [x1, y1, x2, y2]
            })

    return JSONResponse(content={"detections": detections})

@app.post("/reset-password-simple")
async def reset_password_simple(request: EmailRequest):
    email = request.email
    try:
        query = "SELECT id FROM app.users WHERE email = $1;"
        async with app.state.pool.acquire() as conn:
            user = await conn.fetchrow(query, email)

        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")

        new_password = generate_random_password()
        password_bytes = new_password.encode("utf-8")[:72]
        hashed_pw = bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")

        update_query = "UPDATE app.users SET password_hash = $1 WHERE email = $2;"
        async with app.state.pool.acquire() as conn:
            await conn.execute(update_query, hashed_pw, email)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Nova senha de acesso"
        msg["From"] = EMAIL_SENDER
        msg["To"] = email
        html_content = f"""
        <html>
            <body>
                <p>Olá!<br><br>
                Sua nova senha é: <b>{new_password}</b><br><br>
                Recomendamos alterá-la após o primeiro login.
                </p>
            </body>
        </html>
        """
        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, email, msg.as_string())

        return {"message": "Nova senha enviada para o e-mail com sucesso."}

    except HTTPException:
        raise
    except Exception as e:
        print("Erro ao redefinir senha:", e)
        raise HTTPException(status_code=500, detail="Erro ao redefinir senha.")