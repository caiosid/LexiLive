import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import ForgotPassword from "./ForgotPassword";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("ForgotPassword Screen - Renderização", () => {
  it("deve renderizar todos os elementos corretamente", () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    expect(getByText("Esqueceu a sua senha?")).toBeTruthy();

    expect(getByPlaceholderText("Email")).toBeTruthy();

    expect(getByText("Enviar")).toBeTruthy();
    expect(getByText("Voltar")).toBeTruthy();
  });
});

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("ForgotPassword Screen - Botão Voltar", () => {
  it("deve navegar para a tela de Login ao clicar em Voltar", () => {
    const { getByText } = render(<ForgotPassword />);
    const voltarButton = getByText("Voltar");

    fireEvent.press(voltarButton);

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});

describe("ForgotPassword Screen - Validações de formulário", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir alerta se o campo de email estiver vazio", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText } = render(<ForgotPassword />);

    fireEvent.press(getByText("Enviar"));

    expect(alertMock).toHaveBeenCalledWith(
      "Erro",
      "O campo de email está vazio."
    );
  });

  it("deve exibir alerta se o email for inválido", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    fireEvent.changeText(getByPlaceholderText("Email"), "email-invalido");
    fireEvent.press(getByText("Enviar"));

    expect(alertMock).toHaveBeenCalledWith("Erro", "Digite um email válido.");
  });

  it("deve exibir alerta de sucesso se o email for válido", () => {
    const alertMock = jest.spyOn(Alert, "alert");
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "lexi.live.see@gmail.com"
    );
    fireEvent.press(getByText("Enviar"));

    expect(alertMock).toHaveBeenCalledWith(
      "Sucesso",
      "Email enviado com sucesso!"
    );
  });
});
