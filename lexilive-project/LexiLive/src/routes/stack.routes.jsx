import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Welcome from "../screens/Welcome/Welcome";
import ChooseLanguage from "../screens/ChooseLanguage/ChooseLanguage";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import Register from "../screens/Register/Register";
import Camera from "../screens/Camera/Camera";
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
        name="ChooseLanguage"
        options={{
          title: "ChooseLanguage",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={ChooseLanguage}
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
      <Screen
        name="Register"
        options={{
          title: "Register",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={Register}
      />
      <Screen
        name="Camera"
        options={{
          title: "Camera",
          headerTitleAlign: "center",
          headerShown: false,
        }}
        component={Camera}
      />
    </Navigator>
  );
}
