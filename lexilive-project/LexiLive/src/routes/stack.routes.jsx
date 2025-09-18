import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Welcome from "../screens/Welcome/Welcome";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen
        name="Welcome"
        options={{
          title: "Welcome",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={Welcome}
      />
      <Screen
        name="Login"
        options={{
          title: "Login",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={Login}
      />
      <Screen
        name="ForgotPassword"
        options={{
          title: "Forgot",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={ForgotPassword}
      />
    </Navigator>
  );
}
