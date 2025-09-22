import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 28,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle:{
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  }
});

