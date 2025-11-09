import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { registerUser } from "../../api/api";
import Register from "./Register";

jest.mock("../../api/api", () => ({
  registerUser: jest.fn(),
}));

describe("Tela de Registro - Renderização", () => {
  it("deve renderizar todos os campos e botões corretamente", () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Repita seu email")).toBeTruthy();
    expect(getByPlaceholderText("Nome")).toBeTruthy();
    expect(getByPlaceholderText("Senha")).toBeTruthy();

    expect(getByText("Cadastrar")).toBeTruthy();

    expect(getByText("Crie sua conta")).toBeTruthy();
    expect(getByText("Insira seus dados abaixo")).toBeTruthy();
  });
});

it("deve permitir digitar nos campos e atualizar os valores", () => {
  const { getByPlaceholderText } = render(<Register />);

  const emailInput = getByPlaceholderText("Email");
  const confirmEmailInput = getByPlaceholderText("Repita seu email");
  const nameInput = getByPlaceholderText("Nome");
  const passwordInput = getByPlaceholderText("Senha");

  fireEvent.changeText(emailInput, "lexilivesee@gmail.com");
  fireEvent.changeText(confirmEmailInput, "lexilivesee@gmail.com");
  fireEvent.changeText(nameInput, "Lexi");
  fireEvent.changeText(passwordInput, "123456");

  expect(emailInput.props.value).toBe("lexilivesee@gmail.com");
  expect(confirmEmailInput.props.value).toBe("lexilivesee@gmail.com");
  expect(nameInput.props.value).toBe("Lexi");
  expect(passwordInput.props.value).toBe("123456");
});

describe("Register Screen - Validações de Formulário", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir alerta se campos estiverem vazios", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText } = render(<Register />);

    fireEvent.press(getByText("Cadastrar"));

    expect(alertMock).toHaveBeenCalledWith(
      "Erro",
      "Por favor, preencha todos os campos!"
    );
  });

  it("deve exibir alerta se o email for inválido", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText, getByPlaceholderText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("Email"), "email-invalido");
    fireEvent.changeText(
      getByPlaceholderText("Repita seu email"),
      "email-invalido"
    );
    fireEvent.changeText(getByPlaceholderText("Nome"), "Lexi");
    fireEvent.changeText(getByPlaceholderText("Senha"), "123456");

    fireEvent.press(getByText("Cadastrar"));

    expect(alertMock).toHaveBeenCalledWith("Erro", "Digite um email válido!");
  });

  it("deve exibir alerta se os emails não coincidirem", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText, getByPlaceholderText } = render(<Register />);

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "lexi.live.see@gmail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Repita seu email"),
      "diferente@gmail.com"
    );
    fireEvent.changeText(getByPlaceholderText("Nome"), "Lexi");
    fireEvent.changeText(getByPlaceholderText("Senha"), "123456");

    fireEvent.press(getByText("Cadastrar"));

    expect(alertMock).toHaveBeenCalledWith("Erro", "Os emails não coincidem!");
  });
});

// Mock fora do escopo do teste
jest.mock("../../api/api", () => ({
  registerUser: jest.fn(),
}));

describe("Register Screen - Chamada da função registerUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar registerUser com os dados corretos e exibir alerta de sucesso", async () => {
    const alertMock = jest.spyOn(Alert, "alert");
    registerUser.mockResolvedValue({ message: "Usuário criado com sucesso!" });

    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "lexi.live.see@gmail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Repita seu email"),
      "lexi.live.see@gmail.com"
    );
    fireEvent.changeText(getByPlaceholderText("Nome"), "Lexi");
    fireEvent.changeText(getByPlaceholderText("Senha"), "123456");

    fireEvent.press(getByText("Cadastrar"));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith(
        "Lexi",
        "lexi.live.see@gmail.com",
        "123456"
      );
      expect(alertMock).toHaveBeenCalledWith(
        "Sucesso",
        "Usuário criado com sucesso!"
      );
    });
  });
});
