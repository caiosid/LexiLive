import { View, Text} from "react-native";
import { styles } from "./styles";

export default function ChooseLanguage() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Escolha o seu idioma</Text>
        <Text style={styles.subtitle}>Selecione um idioma para começar a aprender</Text>

        <View>
            <Text>oi</Text>
        </View>
    </View>
    
  );
}
