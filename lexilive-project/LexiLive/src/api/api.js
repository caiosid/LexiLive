export const API_URL = "http://192.168.0.36:8000";

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao registrar usuário");
    }

    return data;
  } catch (err) {
    console.error("Erro na API:", err.message);
    throw err;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao fazer login");
    }

    return data;
  } catch (err) {
    console.error("Erro na API:", err.message);
    throw err;
  }
}

export async function detectObjects(uri) {
  try {
    const formData = new FormData();

    // Verifica se é uma URI de arquivo local ou base64
    if (uri.startsWith("file://") || uri.startsWith("blob:")) {
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("file", {
        uri,
        name: filename,
        type,
      });
    } else {
      // No navegador: baixa a imagem como blob real
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append("file", blob, "photo.jpg");
    }

    // Faz a requisição
    const response = await fetch(`${API_URL}/detect`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na resposta do servidor:", errorText);
      throw new Error(`Erro ${response.status}`);
    }

    // Retorna JSON
    return await response.json();
  } catch (error) {
    console.error("Erro ao detectar objetos:", error);
    return { detections: [] };
  }
}
