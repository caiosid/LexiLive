import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

export default function ChooseLanguage() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/lente.png")} style={styles.logo} />
      <Text style={styles.title}>Selecione o seu idioma</Text>
      <Text style={styles.subTitle}>Idiomas</Text>

      <View>
        <TouchableOpacity style={styles.languageButton}>
          <Image
            source={require("../../assets/united-state.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Image
            source={require("../../assets/france.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>French</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Image
            source={require("../../assets/italy.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Italian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Image
            source={require("../../assets/germany.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>German</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Image
            source={require("../../assets/spain.png")}
            style={styles.flagImage}
          />
          <Text style={styles.languageText}>Spanish</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.titleButton}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}
