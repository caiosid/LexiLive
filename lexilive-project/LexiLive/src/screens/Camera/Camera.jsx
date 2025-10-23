import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image as RNImage,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { detectObjects } from "../../api/api";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null);
  const [uri, setUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [recording, setRecording] = useState(false);
  const [detections, setDetections] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [photoSize, setPhotoSize] = useState({ width: 0, height: 0 });

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textPermision}>Permissão para usar a câmera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.buttonPermission}
        >
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setUri(photo.uri);

      // Captura tamanho real da imagem
      RNImage.getSize(photo.uri, (width, height) => {
        setPhotoSize({ width, height });
        console.log("Resolução real da foto:", width, "x", height);
      });
      
      // Envia para o backend
      const result = await detectObjects(photo.uri);
      setDetections(result.detections || []);
      console.log("Detections:", result.detections);
    }
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  // Exibição da imagem capturada com boxes ajustadas automaticamente
  const renderPicture = (uri) => {
    return (
      <View style={styles.container}>
        <View
          style={styles.imageWrapper}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setImageSize({ width, height });
          }}
        >
          <Image
            source={{ uri }}
            contentFit="contain"
            style={styles.capturedImage}
          />

          {/* Renderização das bounding boxes */}
          {detections &&
            detections.map((det, i) => {
              if (!photoSize.width || !photoSize.height) return null;

              const [x1, y1, x2, y2] = det.bbox;
              const boxWidth = x2 - x1;
              const boxHeight = y2 - y1;

              const scaleX = imageSize.width / photoSize.width;
              const scaleY = imageSize.height / photoSize.height;

              const left = x1 * scaleX;
              const top = y1 * scaleY;

              // Cores baseadas no nome da classe
              const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7"];
              const color =
                colors[Math.abs(det.class.charCodeAt(0) + i) % colors.length];

              return (
                <View
                  key={i}
                  style={{
                    position: "absolute",
                    left,
                    top,
                    width: boxWidth * scaleX,
                    height: boxHeight * scaleY,
                    borderWidth: 2,
                    borderColor: color,
                    borderRadius: 8,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -24,
                      left: 0,
                      backgroundColor: color,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 12,
                        textShadowColor: "rgba(0,0,0,0.3)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      {det.class.toUpperCase()} ({(det.confidence * 100).toFixed(1)}%)
                    </Text>
                  </View>
                </View>
              );
            })}

        </View>

        <TouchableOpacity
          onPress={() => {
            setUri(null);
            setDetections(null);
          }}
          style={styles.buttonPermission}
        >
          <Ionicons name="refresh" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <Feather name="video" size={32} color="white" />
            )}
          </Pressable>

          <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
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
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture(uri) : renderCamera()}
    </View>
  );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  textPermision: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b7280",
    textAlign: "center",
  },
  buttonPermission: {
    backgroundColor: "#d946ef",
    borderRadius: 35,
    margin: 10,
    padding: 15,
  },
  cameraContainer: StyleSheet.absoluteFillObject,
  camera: StyleSheet.absoluteFillObject,
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imageWrapper: {
    width: screenWidth,
    aspectRatio: 3 / 4,
    position: "relative",
    backgroundColor: "#000",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
  },
  label: {
    position: "absolute",
    top: -20,
    left: 0,
    color: "red",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: 12,
  },
});
