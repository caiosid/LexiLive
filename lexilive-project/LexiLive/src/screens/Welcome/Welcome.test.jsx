import { render, fireEvent } from "@testing-library/react-native";
import Welcome from "./Welcome";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  NavigationContainer: ({ children }) => <>{children}</>,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("Tela de Boas-Vindas (Welcome)", () => {
  it("renderiza o título principal 'Bem-vindo ao LexiLive'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );
    expect(getByText("Bem-vindo ao LexiLive")).toBeTruthy();
  });

  it("renderiza o subtítulo 'Aprenda vocabulário com a vida Real!'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );
    expect(getByText("Aprenda vocabulário com a vida Real!")).toBeTruthy();
  });

  it("renderiza o texto descritivo do aplicativo", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );
    expect(getByText(/O LexiLive oferece uma maneira intuitiva/i)).toBeTruthy();
  });

  it("deve navegar para 'Login' ao clicar no botão 'Começar'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );

    const startButton = getByText("Começar");
    fireEvent.press(startButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });

  it("deve navegar para 'Register' ao clicar no link 'Crie sua conta'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );

    const registerLink = getByText("Crie sua conta");
    fireEvent.press(registerLink);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Register");
  });
});
