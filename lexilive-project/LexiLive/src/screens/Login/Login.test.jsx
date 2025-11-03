import { render } from "@testing-library/react-native";
import Login from "./Login";
import { NavigationContainer } from "@react-navigation/native";

// rendering tests for Login screen
describe("Tela de Login", () => {
  it("renderiza o título de boas-vindas", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    expect(getByText("Sejam Bem-Vindos")).toBeTruthy();
  });

  it("renderiza a imagem do logo", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const logo = getByTestId("logo-image");
    expect(logo).toBeTruthy();
  });

  it("renderiza o campo de email", () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    expect(getByPlaceholderText("Email de usuário")).toBeTruthy();
  });

  it("renderiza o campo de senha", () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const passwordInput = getByPlaceholderText("Senha");
    expect(passwordInput).toBeTruthy();
  });
});
