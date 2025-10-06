import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 50,
  },
  textPermission: {
    textAlign: "center",
    paddingBottom: 10,
    color: "#fff",
    fontSize: 18,
  },
  button: {
    width: "40%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  textButton: {
    textAlign: "center",
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    color: colors.background,
    marginBottom: 5,
  },
  camera: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    zIndex: 10,
  },
  iconButton: {
    padding: 10,
  },
  luxDisplay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginHorizontal: 10,
  },
  luxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
    zIndex: 10,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});
