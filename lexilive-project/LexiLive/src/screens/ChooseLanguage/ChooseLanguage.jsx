import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ChooseLanguage() {
  const navigation = useNavigation();

  const handleLanguageSelect = (langCode) => {
    navigation.navigate("Camera", { language: langCode });
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/lente.png")} style={styles.logo} />
      <Text style={styles.title}>Selecione o seu idioma</Text>
      <Text style={styles.subTitle}>Idiomas</Text>

      <View>
        <TouchableOpacity style={styles.languageButton}
        onPress={() => handleLanguageSelect("en")}>
          <Image
            source={require("../../assets/united-state.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Inglês</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}
        onPress={() => handleLanguageSelect("fr")}>
          <Image
            source={require("../../assets/france.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Francês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}
        onPress={() => handleLanguageSelect("it")}>
          <Image
            source={require("../../assets/italy.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Italiano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}
        onPress={() => handleLanguageSelect("de")}>
          <Image
            source={require("../../assets/germany.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Alemão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}
        onPress={() => handleLanguageSelect("es")}>
          <Image
            source={require("../../assets/spain.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Espanhol</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
