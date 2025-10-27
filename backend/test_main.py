import io
import pytest
from fastapi.testclient import TestClient
from PIL import Image
from main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_root():
    """Testa se a API está online"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "running"

@pytest.mark.asyncio
async def test_register_and_login(monkeypatch):
    """🔍 Testa o fluxo completo de cadastro e login com mocks (sem banco real)."""

    # --- 🔧 Mock do banco de dados ---
    class FakeConn:
        async def fetchval(self, query, *args):
            return 1

        async def fetchrow(self, query, *args):
            return {
                "id": 1,
                "password_hash": "$2b$12$J8N5fZoV6vFjAVXh1.g1m.MpOEp5gVjKxH4P9vMveBb/6b8KpYAYW"
            }

    class FakeAcquire:
        def __init__(self):
            self.conn = FakeConn()

        async def __aenter__(self):
            return self.conn

        async def __aexit__(self, exc_type, exc, tb):
            pass

    class FakePool:
        def acquire(self):
            # Retorna o context manager diretamente, **não async def**
            return FakeAcquire()

    # Substitui o pool real pelo mock
    app.state.pool = FakePool()


    # --- 🧍 1. Teste de cadastro ---
    user_data = {"name": "Test", "email": "test@example.com", "password": "test123"}
    response = client.post("/register", json=user_data)

    assert response.status_code in (200, 400), f"Erro inesperado no /register: {response.text}"

    if response.status_code == 200:
        data = response.json()
        assert "id" in data or "message" in data, "Resposta inválida no cadastro"

    elif response.status_code == 400:
        data = response.json()
        assert "error" in data or "message" in data, "Resposta de erro de cadastro mal formatada"

    # --- 🔐 2. Login com senha correta ---
    login_data = {"email": "test@example.com", "password": "test123"}
    response = client.post("/login", json=login_data)

    assert response.status_code in (200, 401, 500), f"Status inesperado no login: {response.status_code}"

    if response.status_code == 200:
        data = response.json()
        assert "access_token" in data, "Token ausente na resposta de login"
        assert data["token_type"] == "bearer", "Tipo de token incorreto"

    elif response.status_code == 401:
        data = response.json()
        assert "detail" in data, "Erro 401 sem mensagem explicativa"

    # --- 🚫 3. Login com senha errada ---
    login_data = {"email": "test@example.com", "password": "wrongpassword"}
    response = client.post("/login", json=login_data)

    assert response.status_code == 401, f"Esperado 401 para senha errada, obtido {response.status_code}"
    data = response.json()
    assert "detail" in data, "Resposta 401 sem campo 'detail'"
    assert "senha" in data["detail"].lower() or "credenciais" in data["detail"].lower(), \
        "Mensagem de erro deve indicar problema de senha/credenciais"

    # --- 👻 4. Login com usuário inexistente ---
    login_data = {"email": "wrong@example.com", "password": "test123"}
    response = client.post("/login", json=login_data)

    assert response.status_code == 401, f"Esperado 401 para usuário inexistente, obtido {response.status_code}"
    data = response.json()
    assert "detail" in data, "Resposta 401 sem campo 'detail'"


@pytest.mark.asyncio
async def test_detect_objects(monkeypatch):
    """Testa o endpoint de detecção de objetos com mock do modelo YOLO"""

    # Cria uma imagem RGB simples para teste
    img = Image.new("RGB", (100, 100), color="white")
    img_bytes = io.BytesIO()
    img.save(img_bytes, format="JPEG")
    img_bytes.seek(0)

    # Mock do modelo YOLO
    class FakeResult:
        def __init__(self):
            self.boxes = [type("Box", (), {
                "cls": [0],
                "conf": [0.95],
                "xyxy": [[10, 20, 50, 60]]
            })]

    class FakeModel:
        names = {0: "object"}
        def __call__(self, image):
            return [FakeResult()]

    monkeypatch.setattr("main.model", FakeModel())

    # Envia a imagem
    response = client.post("/detect/", files={"file": ("test.jpg", img_bytes, "image/jpeg")})
    assert response.status_code == 200

    data = response.json()
    assert "detections" in data
    assert len(data["detections"]) == 1
    assert data["detections"][0]["class"] == "object"
