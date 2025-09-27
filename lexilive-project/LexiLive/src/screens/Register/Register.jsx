import React, { useState } from "react";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { registerUser } from  "../../api/api"


export default function Register() {
  // Estados para os inputs
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Função chamada ao clicar em "Cadastrar"
  const handleRegister = async() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !confirmEmail || !password || !name) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Digite um email válido!");
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert("Erro", "Os emails não coincidem!");
      return;
    }

    
      try {
        // envia para o backend
        const result = await registerUser(name, email, password);
        Alert.alert("Sucesso", result.message);
        // aqui você pode limpar os campos ou redirecionar
        setName("");
        setEmail("");
        setConfirmEmail("");
        setPassword("");
      } catch (err) {
        Alert.alert("Erro", err.message);
      }
  };

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
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Repita seu email"
        textAlign="center"
        keyboardType="email-address"
        placeholderTextColor="#b588c6ff"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        textAlign="center"
        keyboardType="text"
        placeholderTextColor="#b588c6ff"
        value={name}
        onChangeText={setName}
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
        style={styles.loginButton}
        activeOpacity={0.7}
        onPress={handleRegister}
      >
        <Text style={styles.loginButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
