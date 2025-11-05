import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import { loginUser } from "../../api/api";
import { Alert } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  function registerUser() {
    navigation.navigate("Register");
  }

  const login = async () => {
    try {
      const result = await loginUser(email, password);
      Alert.alert("Sucesso", result.message ?? "Login realizado com sucesso!");
      navigation.navigate("ChooseLanguage");
    } catch (err) {
      Alert.alert("Erro", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../../assets/lente.png")}
        style={styles.logo}
        testID="logo-image"
      />
      <Text style={styles.title}>Sejam Bem-Vindos</Text>

      <TextInput
        style={styles.input}
        placeholder="Email de usuário"
        textAlign="center"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#b588c6ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        textAlign="center"
        placeholderTextColor="#b588c6ff"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={handleForgotPassword}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.7}
        onPress={login}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <TouchableOpacity style={styles.dividerOpacity} onPress={registerUser}>
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
    </KeyboardAvoidingView>
  );
}
