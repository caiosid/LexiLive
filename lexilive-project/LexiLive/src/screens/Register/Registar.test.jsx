import { render, fireEvent } from "@testing-library/react-native";
import ChooseLanguage from "./ChooseLanguage";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();

describe("Tela de Seleção de Idioma (ChooseLanguage)", () => {
  const runLanguageTest = (languageText, expectedCode) => {
    it(`deve navegar para Camera com o código '${expectedCode}' ao selecionar ${languageText}`, () => {
      const { getByText } = render(
        <NavigationContainer>
          <ChooseLanguage />
        </NavigationContainer>
      );

      const languageButton = getByText(languageText);
      fireEvent.press(languageButton);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      // Deve ser chamado com a ROTA e o PARÂMETRO correto
      expect(mockNavigate).toHaveBeenCalledWith("Camera", {
        language: expectedCode,
      });
    });
  };

  runLanguageTest("Inglês", "en");
  runLanguageTest("Francês", "fr");
  runLanguageTest("Italiano", "it");
  runLanguageTest("Alemão", "de");
  runLanguageTest("Espanhol", "es");
});
