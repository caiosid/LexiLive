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
    width: 100,
    height: 100,
    marginTop: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 17,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textSecondary,
    marginBottom: 5,
  },
   input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  loginButton: {
    width: "60%",
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "bold",
  },
});
