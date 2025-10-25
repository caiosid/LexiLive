import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
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

export default function CameraScreen() {
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

  // calcula posição/escala dos boxes na área visível (wrapperSize)
  const getScaledBox = (bbox) => {
    const [x1, y1, x2, y2] = bbox;
    const boxWidth = x2 - x1;
    const boxHeight = y2 - y1;

    if (!photoSize.width || !photoSize.height || !wrapperSize.width || !wrapperSize.height) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    // escala preservando proporção por largura e altura (fit)
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
    try {
      if (!cameraRef.current || !cameraRef.current.takePictureAsync) {
        console.warn("Camera ref não pronta");
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7, skipProcessing: true });

      if (!photo?.uri) return;
      setUri(photo.uri);

      // pega dimensões reais da imagem
      await new Promise((resolve) => {
        if (Platform.OS === "web") {
          const img = new window.Image();
          img.onload = () => {
            setPhotoSize({ width: img.width, height: img.height });
            resolve();
          };
          img.onerror = () => {
            // fallback
            setPhotoSize({ width: photo.width || 1080, height: photo.height || 1920 });
            resolve();
          };
          img.src = photo.uri;
        } else {
          RNImage.getSize(
            photo.uri,
            (w, h) => {
              setPhotoSize({ width: w, height: h });
              resolve();
            },
            (err) => {
              console.warn("RNImage.getSize erro:", err);
              setPhotoSize({ width: photo.width || 1080, height: photo.height || 1920 });
              resolve();
            }
          );
        }
      });

      // envia para backend
      try {
        const res = await detectObjects(photo.uri);
        setDetections(res?.detections || []);
      } catch (err) {
        console.error("Erro detectObjects:", err);
        setDetections([]);
      }
    } catch (err) {
      console.error("Erro ao tirar foto:", err);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleMode = () => setMode((m) => (m === "picture" ? "video" : "picture"));

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        facing={facing}
        enableZoomGesture
        autofocus="on"
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
              <View style={[styles.shutterBtnInner, { backgroundColor: "white" }]} />
            </View>
          )}
        </Pressable>

        <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="rotate-left" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );

  const renderPicture = () => {
    const aspectStyle =
      photoSize.width && photoSize.height ? { aspectRatio: photoSize.width / photoSize.height } : { aspectRatio: 3 / 4 };

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[styles.previewWrapper, aspectStyle]}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            if (width && height) setWrapperSize({ width, height });
          }}
        >
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Image source={{ uri }} style={styles.fullImage} contentFit="contain" />
            {/* boxes */}
            {detections.map((det, i) => {
              const { left, top, width, height } = getScaledBox(det.bbox);
              const color = det.confidence > 0.85 ? "#22c55e" : det.confidence > 0.6 ? "#eab308" : "#ef4444";

              return (
                <MotiView
                  key={`box-${i}`}
                  from={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "timing", duration: 380, delay: i * 50 }}
                  style={[
                    styles.bbox,
                    {
                      left,
                      top,
                      width,
                      height,
                      borderColor: color,
                      shadowColor: color,
                    },
                  ]}
                  pointerEvents="none"
                >

                  <MotiView
                    from={{ opacity: 0.18, scale: 1 }}
                    animate={{ opacity: 0.35, scale: 1.05 }}
                    transition={{
                      type: "timing",
                      duration: 1200,
                      loop: true,
                      repeatReverse: true,
                    }}
                    style={[
                      StyleSheet.absoluteFill,
                      { borderRadius: 6, borderWidth: 2, borderColor: color, backgroundColor: "transparent" },
                    ]}
                    pointerEvents="none"
                  />
                </MotiView>
              );
            })}
          </View>

          {/* camada de labels */}
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {detections.map((det, i) => {
              const { left, top, width, height } = getScaledBox(det.bbox);
              const color = det.confidence > 0.85 ? "#22c55e" : det.confidence > 0.6 ? "#eab308" : "#ef4444";
              const labelY = top < 30 ? top + height + 4 : top - 26;

              // escala adaptativa
              const areaRatio = Math.max(0, (width * height) / (wrapperSize.width * wrapperSize.height));
              const dynamicFont = Math.min(18, Math.max(10, 10 + areaRatio * 2500));
              const dynamicPadding = Math.min(8, Math.max(4, 4 + areaRatio * 1000));

              return (
                <MotiView
                  key={`label-${i}`}
                  from={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "timing", duration: 420, delay: i * 70 }}
                  style={[
                    styles.labelContainer,
                    {
                      left,
                      top: labelY,
                      backgroundColor: color,
                      paddingHorizontal: dynamicPadding,
                      paddingVertical: Math.max(2, dynamicPadding / 2),
                      shadowColor: color,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.75,
                      shadowRadius: 6,
                      elevation: 6,
                    },
                  ]}
                  pointerEvents="auto"
                >
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: dynamicFont,
                        textShadowColor: color,
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 6,
                      },
                    ]}
                  >
                    {det.class.toUpperCase()} ({(det.confidence * 100).toFixed(1)}%)
                  </Text>

                  <TouchableOpacity
                    onPress={() => speakLabel(det.class)}
                    style={[styles.soundButton, { marginLeft: 6 }]}
                  >
                    <Ionicons name="volume-high" size={Math.max(12, dynamicFont - 2)} color="#fff" />
                  </TouchableOpacity>
                </MotiView>
              );
            })}
          </View>

          <View style={styles.topControls} pointerEvents="auto">
            <TouchableOpacity
              onPress={() => {
                setUri(null);
                setDetections([]);
              }}
              style={styles.smallBtn}
            >
              <Ionicons name="refresh" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // ---------- fluxo principal ----------
  if (!permission) {
    return (
      <View style={styles.loading}>
        <Text style={styles.textPermision}>Solicitando permissão...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textPermision}>Permissão para usar a câmera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.buttonPermission}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return uri ? renderPicture() : renderCamera();
}

// ---------- estilos ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loading: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },

  // câmera
  cameraContainer: { flex: 1, backgroundColor: "#000" },
  shutterContainer: {
    position: "absolute",
    bottom: Platform.OS === "web" ? 20 : 28,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 60,
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
  shutterBtnInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: "white" },

  // preview
  previewWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: { width: "100%", height: "100%" },

  // box e efeito
  bbox: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },

  // labels
  labelContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 100,
  },
  labelText: {
    color: "#fff",
    fontWeight: "800",
    marginRight: 6,
  },
  soundButton: { padding: 4 },

  topControls: {
    position: "absolute",
    top: 36,
    right: 18,
    zIndex: 200,
  },
  smallBtn: {
    backgroundColor: "#7c3aed",
    padding: 10,
    borderRadius: 28,
  },

  // permissão
  textPermision: { color: "#cbd5e1", fontSize: 16, textAlign: "center", marginTop: 10 },
  buttonPermission: { alignSelf: "center", marginTop: 20, backgroundColor: "#7c3aed", padding: 12, borderRadius: 28 },
});
