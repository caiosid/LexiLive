import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function Welcome() {
  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate("Login");
  }

  function chooseLanguage() {
    navigation.navigate("ChooseLanguage");
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/language.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo ao LexiLive</Text>
      <Text style={styles.subtitle}>Aprenda vocabulário com a vida Real!</Text>
      <Text style={styles.paragraph}>
        O LexiLive oferece uma maneira intuitiva de construir um vocabulário sólido. Ao
        permitir que os usuários escolham entre diversos idiomas, como inglês,
        francês, italiano e espanhol, o LexiLive busca tornar o processo de
        aprendizado mais dinâmico e alinhado com as necessidades do dia a dia
      </Text>

      <TouchableOpacity style={styles.button} onPress={chooseLanguage}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={openScreen}>
          <Text style={styles.bottomText}>Acesse sua conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
