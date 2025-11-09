import React, { useState } from "react";
import { styles } from "./styles";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetPasswordSimple } from "../../api/api"; 

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendEmail() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, insira o seu e-mail.");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPasswordSimple(email.trim());
      Alert.alert("Sucesso", response.message || "Nova senha enviada para o e-mail!");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Erro", err.message || "Erro ao redefinir senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={require("../../assets/lente.png")} style={styles.logo} />

      <Text style={styles.title}>Esqueceu a sua senha?</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        textAlign="center"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSendEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Enviar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <TouchableOpacity style={styles.dividerOpacity} onPress={handleLogin}>
          <Text style={styles.dividerText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}