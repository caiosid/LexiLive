import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  View,
  Text,
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
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const imageHeight = 650
  const imageWidth = 100



  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textPermision}>Permissão</Text>
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
      const result = await detectObjects(photo.uri);
      console.log(result)
      setDetections(result.detections || []);
      console.log(detections)
      detections.forEach((det, i) => {
        console.log(`Detection ${i}:`, det.class, det.confidence, det.bbox);
      });
      console.log("Detections:", result);
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

  const renderPicture = (uri) => {
  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri }}
          // contentFit="contain"
          style={{ width: imageWidth, height: imageHeight, aspectRatio: 1 }}
          // onLayout={(e) => {
          //   const { width, height } = e.nativeEvent.layout;
          //   setLayout({ width, height });
          // }}
          
        />
        {/* Draw boxes */}
        {detections && detections.map((det, i) => {
          const [x1, y1, x2, y2] = det.bbox; // normalized coords
          const left = x1 * layout.width;
          const top = y1 * layout.height;
          const boxWidth = (x2 - x1) * layout.width;
          const boxHeight = (y2 - y1) * layout.height;

          return (
            <View
              key={i}
              style={{
                position: "absolute",
                left,
                top,
                width: boxWidth,
                height: boxHeight,
                borderWidth: 2,
                borderColor: "red",
              }}
            >
              <Text
                style={{
                  position: "absolute",
                  top: -20,
                  left: 0,
                  color: "red",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  fontSize: 12,
                }}
              >
                {det.class} ({(det.confidence * 100).toFixed(1)}%)
              </Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={() => setUri(null)}
        style={styles.buttonPermission}
      >
        <Ionicons name="image" size={30} color="white" />
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
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
});
