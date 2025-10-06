import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LightSensor } from "expo-sensors";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Camera() {
  // --- Estados da Câmera ---
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [flash, setFlash] = useState("off");

  // --- Estados do Sensor de Luz ---
  const [{ illuminance }, setData] = useState({ illuminance: 0 }); // Valor do Lux
  const [sensorSubscription, setSensorSubscription] = useState(null); // Inscrição do sensor

  // --- Funções do Sensor de Luz ---

  const subscribeLightSensor = () => {
    // A cada atualização do sensor, chamamos setData para atualizar o estado
    setSensorSubscription(
      LightSensor.addListener((sensorData) => {
        setData(sensorData);
      })
    );
  };

  const unsubscribeLightSensor = () => {
    // Remove a inscrição para parar de ler o sensor e libera recursos
    sensorSubscription && sensorSubscription.remove();
    setSensorSubscription(null);
  };

  // Efeito colateral: Inicia a leitura do sensor na montagem e para na desmontagem.
  useEffect(() => {
    if (Platform.OS === "android") {
      // O LightSensor só é amplamente disponível no Android
      subscribeLightSensor();
      return () => unsubscribeLightSensor();
    }
    // O array de dependências vazio garante que isso rode apenas na montagem/desmontagem
  }, []);

  // --- Lógica de Permissões da Câmera (Sem Alteração) ---

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  // --- Funções de Controle da Câmera (Leves Ajustes) ---

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((current) => (current === "off" ? "torch" : "off"));
  }

  function goToSettings() {
    Linking.openSettings();
  }

  function takePicture() {
    console.log("Tirando foto...");
  }

  // --- Interface de Usuário ---

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        cameraOptions={{
          flash: flash,
          zoom: 0,
          hdr: true,
        }}
      />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={goToSettings} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.luxDisplay}>
          <Text style={styles.luxText}>
            LUX: {Platform.OS === "android" ? illuminance.toFixed(2) : "N/D"}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
          <Ionicons
            name={flash === "torch" ? "flashlight" : "flash-off"}
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleCameraFacing}
          style={styles.iconButton}
        >
          <Ionicons name="camera-reverse-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
