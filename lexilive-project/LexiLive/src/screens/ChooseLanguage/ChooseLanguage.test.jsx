import { render } from "@testing-library/react-native";
import ChooseLanguage from "./ChooseLanguage";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  NavigationContainer: ({ children }) => <>{children}</>,
}));

describe("Tela de Seleção de Idioma (ChooseLanguage)", () => {
  it("renderiza o título principal 'Selecione o seu idioma'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ChooseLanguage />
      </NavigationContainer>
    );
    expect(getByText("Selecione o seu idioma")).toBeTruthy();
  });

  it("renderiza o subtítulo 'Idiomas'", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ChooseLanguage />
      </NavigationContainer>
    );
    expect(getByText("Idiomas")).toBeTruthy();
  });

  it("renderiza todas as opções de idioma", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ChooseLanguage />
      </NavigationContainer>
    );

    expect(getByText("Inglês")).toBeTruthy();
    expect(getByText("Francês")).toBeTruthy();
    expect(getByText("Italiano")).toBeTruthy();
    expect(getByText("Alemão")).toBeTruthy();
    expect(getByText("Espanhol")).toBeTruthy();
  });
});
