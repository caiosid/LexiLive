import React from "react";
import { styles } from "./styles";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../../assets/codigo-de-senha.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Esqueceu a sua senha?</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        textAlign="center"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Enviar</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <TouchableOpacity style={styles.dividerOpacity} onPress={handleLogin}>
          <Text style={styles.dividerText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
