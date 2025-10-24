import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState, useEffect } from "react";
import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image as RNImage,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Speech from "expo-speech";
import { detectObjects } from "../../api/api";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [uri, setUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [detections, setDetections] = useState([]);
  const [photoSize, setPhotoSize] = useState({ width: 0, height: 0 });
  const [wrapperSize, setWrapperSize] = useState({ width: screenWidth, height: screenHeight });

  const speakLabel = (text) => {
    try {
      Speech.speak(text, { language: "pt-BR", rate: 1.0, pitch: 1.0 });
    } catch (e) {
      console.warn("Erro ao falar:", e);
    }
  };

  const getScaledBox = (bbox) => {
    const [x1, y1, x2, y2] = bbox;
    const boxWidth = x2 - x1;
    const boxHeight = y2 - y1;

    if (!photoSize.width || !photoSize.height) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    const scaleX = wrapperSize.width / photoSize.width;
    const scaleY = wrapperSize.height / photoSize.height;

    return {
      left: x1 * scaleX,
      top: y1 * scaleY,
      width: boxWidth * scaleX,
      height: boxHeight * scaleY,
    };
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (!photo?.uri) return;
    setUri(photo.uri);

    RNImage.getSize(photo.uri, (w, h) => {
      setPhotoSize({ width: w, height: h });
    });

    const res = await detectObjects(photo.uri);
    setDetections(res?.detections || []);
  };

  const toggleFacing = () => setFacing((prev) => (prev === "back" ? "front" : "back"));
  const toggleMode = () => setMode((p) => (p === "picture" ? "video" : "picture"));

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        mode={mode}
        facing={facing}
      />
      <View style={styles.shutterContainer} pointerEvents="auto">
        <Pressable onPress={toggleMode}>
          {mode === "picture" ? (
            <AntDesign name="picture" size={28} color="white" />
          ) : (
            <Feather name="video" size={28} color="white" />
          )}
        </Pressable>

        <Pressable onPress={takePicture}>
          {({ pressed }) => (
            <View style={[styles.shutterBtn, { opacity: pressed ? 0.6 : 1 }]}>
              <View
                style={[
                  styles.shutterBtnInner,
                  { backgroundColor: mode === "picture" ? "white" : "red" },
                ]}
              />
            </View>
          )}
        </Pressable>

        <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="rotate-left" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );

  const renderPicture = () => (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.previewWrapper}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (width && height) setWrapperSize({ width, height });
        }}
      >
        {/* Camada imagem e boxes */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Image
            source={{ uri }}
            style={styles.fullImage}
            contentFit="contain"
          />

          {detections.map((det, i) => {
            const { left, top, width, height } = getScaledBox(det.bbox);
            const color =
              det.confidence > 0.85
                ? "#22c55e"
                : det.confidence > 0.6
                ? "#eab308"
                : "#ef4444";

            return (
              <View
                key={i}
                style={[
                  styles.bbox,
                  { left, top, width, height, borderColor: color },
                ]}
              />
            );
          })}
        </View>

        {/* Camada dos labels (interativa) */}
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {detections.map((det, i) => {
            const { left, top, width, height } = getScaledBox(det.bbox);
            const color =
              det.confidence > 0.85
                ? "#22c55e"
                : det.confidence > 0.6
                ? "#eab308"
                : "#ef4444";
            const labelY = top < 30 ? top + height + 2 : top - 22;

            return (
              <View
                key={`label-${i}`}
                style={[
                  styles.labelContainer,
                  {
                    left,
                    top: labelY,
                    backgroundColor: color,
                  },
                ]}
                pointerEvents="auto"
              >
                <Text style={styles.labelText}>
                  {det.class.toUpperCase()} ({(det.confidence * 100).toFixed(1)}%)
                </Text>
                <TouchableOpacity
                  onPress={() => speakLabel(det.class)}
                  style={styles.soundButton}
                >
                  <Ionicons name="volume-high" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Botão refresh */}
        <View style={styles.topControls}>
          <TouchableOpacity
            onPress={() => {
              setUri(null);
              setDetections([]);
            }}
            style={styles.smallBtn}
          >
            <Ionicons name="refresh" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  if (!permission) return <View style={styles.loading}><Text>...</Text></View>;
  if (!permission.granted)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textPermision}>Permissão para usar a câmera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.buttonPermission}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );

  return uri ? renderPicture() : renderCamera();
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  cameraContainer: { flex: 1, backgroundColor: "#000" },
  previewWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: { width: "100%", height: "100%" },
  bbox: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 6,
  },
  labelContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 30,
  },
  labelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    marginRight: 4,
  },
  soundButton: { padding: 2 },
  shutterContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 50,
  },
  shutterBtn: {
    width: 78,
    height: 78,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: { width: 60, height: 60, borderRadius: 30 },
  topControls: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    zIndex: 100,
  },
  smallBtn: {
    backgroundColor: "#7c3aed",
    padding: 10,
    borderRadius: 28,
  },
  textPermision: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 10,
  },
  buttonPermission: {
    alignSelf: "center",
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 30,
    marginTop: 10,
  },
});
