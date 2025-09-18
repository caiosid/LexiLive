import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Login() {
  const navigation = useNavigation();

  function handleForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/lente.png")} style={styles.logo} />
      <Text style={styles.title}>Sejam Bem-Vindos</Text>
      <Text style={styles.subtitle}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email ou nome de usuário"
        textAlign="center"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        textAlign="center"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <TouchableOpacity style={styles.dividerOpacity}>
          <Text style={styles.dividerText}>Ainda não tem uma conta?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={30} color="#db4437" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
