import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function Welcome() {
  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/camera-drone.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo ao LexiLive</Text>
      <Text style={styles.subtitle}>
        Desenvolvido para transformar qualquer câmera de segurança em um sistema
        de detecção proativo, o LexiLive permite que você defina áreas de
        monitoramento personalizadas as "bordas".
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={openScreen}>
          <Text style={styles.bottomText}>Já tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
