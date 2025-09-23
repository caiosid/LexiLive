import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  titleLanguage: {
    textAlign: "center",
  },
  flagImage: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "lightgreen",
  },
  languageText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary
  },
  button: {
    width: "50%",
    paddingVertical: 15,
    marginTop: 35,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignSelf: "center",
  },
  titleButton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.background,
  },
});
