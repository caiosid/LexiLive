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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    fontWeight: "bold",
    color: colors.primary, // Roxo
    marginBottom: 5,
  },
  subtitle: {
    width: "100%",
    fontSize: 18,
    color: "#888",
    textAlign: "center", // Este é o estilo que garante que o texto quebre a linha corretamente.
    marginBottom: 5,
  },
  button: {
    width: "80%",
    backgroundColor: colors.primary, // Roxo
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
    bottom: 40,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 5,
  },
  linkText: {
    fontSize: 18,
    color: colors.primary, // Roxo
    fontWeight: "bold",
  },
});
