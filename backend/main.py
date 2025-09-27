from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, constr
from passlib.context import CryptContext
import asyncpg
from contextlib import asynccontextmanager
import os
import bcrypt
from fastapi.middleware.cors import CORSMiddleware

# Configuração do Neon
DATABASE_URL = os.getenv("DATABASE_URL", 'postgresql://neondb_owner:npg_1VpXQlR7FAzt@ep-patient-tooth-a8keey1o-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require')

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
        hashed_pw = bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")

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
        raise HTTPException(status_code=500, detail="Erro interno do servidor.")
# teste se API está funcionando
@app.get("/")
async def main():
    return {"status": "running"}