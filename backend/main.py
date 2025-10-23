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
from jose import JOSEError, jwt
from datetime import datetime, timedelta


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


async def get_pool():
    return await asyncpg.create_pool(DATABASE_URL, ssl="require")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.pool = await get_pool()
    yield
    await app.state.pool.close()

app.router.lifespan_context = lifespan


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
