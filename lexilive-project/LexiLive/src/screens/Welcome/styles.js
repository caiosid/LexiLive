import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    width: "100%",
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  paragraph: {
    width: "100%",
    fontSize: 20,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 24,
  },
  button: {
    width: "50%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonCam: {
    width: "20%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 180,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 5,
  },
  linkText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
});
