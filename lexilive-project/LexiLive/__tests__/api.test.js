import { registerUser, loginUser, detectObjects } from '../src/api/api';

describe("Testes do módulo API", () => {

  test("registerUser retorna sucesso", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "Maria", email: "new@example.com" }),
    });

    const res = await registerUser("Maria", "new@example.com", "1234");
    expect(res).toEqual({ id: 1, name: "Maria", email: "new@example.com" });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://192.168.1.14:8000/register",
      expect.objectContaining({ method: "POST" })
    );
  });

  test("registerUser retorna erro se falha", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: "Email já existe" }),
    });

    await expect(registerUser("João", "exists@example.com", "1234"))
      .rejects.toThrow("Email já existe");
  });

  test("loginUser funciona com sucesso", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "fake-jwt-token", email: "user@example.com" }),
    });

    const res = await loginUser("user@example.com", "1234");
    expect(res.token).toBe("fake-jwt-token");
  });

  test("loginUser retorna erro", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: "Credenciais inválidas" }),
    });

    await expect(loginUser("wrong@example.com", "1234"))
      .rejects.toThrow("Credenciais inválidas");
  });

  test("detectObjects retorna detecções mockadas", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        detections: [{ label: "cat", confidence: 0.95 }]
      }),
    });

    const res = await detectObjects("file://photo.jpg");
    expect(res.detections[0]).toEqual({ label: "cat", confidence: 0.95 });
  });

});
