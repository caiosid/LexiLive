export const API_URL = "http://192.168.0.13:8000";

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
    const filename = uri.split("/").pop();
    const fileType = "image/jpeg";

    const formData = new FormData();
    formData.append("file", {
      uri,
      name: filename,
      type: fileType,
    });

    const response = await fetch(`${API_URL}/detect/`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao detectar objetos");
    }

    return data;
  } catch (err) {
    console.error("Erro na API:", err.message);
    throw err;
  }
}