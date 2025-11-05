import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";

import { loginUser } from "../../api/api";
jest.mock("../../api/api", () => ({
  loginUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  NavigationContainer: ({ children }) => <>{children}</>,
}));

jest.spyOn(Alert, "alert");

beforeEach(() => {
  mockNavigate.mockClear();
  loginUser.mockClear();
  Alert.alert.mockClear();
});
describe("Tela de Login", () => {
  it("renderiza o título de boas-vindas", async () => {
    const { findByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const title = await findByText("Sejam Bem-Vindos");
    expect(title).toBeTruthy();
  });

  it("renderiza a imagem do logo", async () => {
    const { findByTestId } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const logo = await findByTestId("logo-image");
    expect(logo).toBeTruthy();
  });

  it("renderiza o campo de email", async () => {
    const { findByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const emailInput = await findByPlaceholderText("Email de usuário");
    expect(emailInput).toBeTruthy();
  });

  it("renderiza o campo de senha", async () => {
    const { findByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const passwordInput = await findByPlaceholderText("Senha");
    expect(passwordInput).toBeTruthy();
  });
});

it("deve navegar para 'ChooseLanguage' após login bem-sucedido", async () => {
  loginUser.mockResolvedValue({ message: "Usuário logado com sucesso!" });

  const { getByPlaceholderText, getByText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  fireEvent.changeText(
    getByPlaceholderText("Email de usuário"),
    "teste@lexilive.com"
  );
  fireEvent.changeText(getByPlaceholderText("Senha"), "senha123");

  const loginButton = getByText("Login");
  await fireEvent.press(loginButton);

  expect(loginUser).toHaveBeenCalledWith("teste@lexilive.com", "senha123");

  expect(Alert.alert).toHaveBeenCalledWith(
    "Sucesso",
    "Usuário logado com sucesso!"
  );

  expect(mockNavigate).toHaveBeenCalledWith("ChooseLanguage");
});

it("deve navegar para 'ForgotPassword' ao clicar em 'Esqueceu sua senha?'", async () => {
  const { findByText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  const forgotPasswordButton = await findByText("Esqueceu sua senha?");
  fireEvent.press(forgotPasswordButton);

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("ForgotPassword");
});

it("deve navegar para 'Register' ao clicar em 'Ainda não tem uma conta?'", async () => {
  const { findByText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  const registerButton = await findByText("Ainda não tem uma conta?");
  fireEvent.press(registerButton);

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("Register");
});

it("deve atualizar o estado de 'email' ao digitar no campo", async () => {
  const testEmail = "teste@entrada.com";
  const { getByPlaceholderText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  const emailInput = getByPlaceholderText("Email de usuário");

  fireEvent.changeText(emailInput, testEmail);

  expect(emailInput.props.value).toBe(testEmail);
});

it("deve atualizar o estado de 'password' ao digitar no campo", async () => {
  const testPassword = "senhafalsa123";
  const { getByPlaceholderText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  const passwordInput = getByPlaceholderText("Senha");

  fireEvent.changeText(passwordInput, testPassword);

  expect(passwordInput.props.value).toBe(testPassword);
});
