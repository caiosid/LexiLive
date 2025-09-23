import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";

export default function Register() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={require("../../assets/lente.png")} style={styles.logo} />
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Insira seus dados abaixo</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        textAlign="center"
        keyboardType="email-address"
        placeholderTextColor="#b588c6ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        textAlign="center"
        placeholderTextColor="#b588c6ff"
      />
      <TextInput
        style={styles.input}
        placeholder="repita o seu email"
        textAlign="center"
        keyboardType="email-address"
        placeholderTextColor="#b588c6ff"
      />

      <TouchableOpacity style={styles.loginButton} activeOpacity={0.7}>
        <Text style={styles.loginButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
