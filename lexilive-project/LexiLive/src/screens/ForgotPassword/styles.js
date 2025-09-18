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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: colors.background,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  dividerOpacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    width: "100%",
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
  },
});
