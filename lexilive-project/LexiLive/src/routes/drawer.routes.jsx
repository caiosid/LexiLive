import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import WelcomeScreen from "../screens/Welcome/Welcome";

const { Screen, Navigator } = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: "navy",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Screen
        name="Welcome"
        options={{
          drawerLabel: "Home",
          headerTitleAlign: "center",
          drawerIcon: () => <MaterialIcons name="home" size={22} />,
        }}
        component={WelcomeScreen}
      />
    </Navigator>
  );
}
