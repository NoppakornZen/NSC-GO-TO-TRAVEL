import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/LoginScreen";
import LobbyScreen from "./app/LobbyScreen";
import ScoutScreen from "./app/ScoutScreen";
import DestinationScreen from "./app/DestinationScreen";
import ScoutAnimationScreen from "./app/ScoutAnimationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={LobbyScreen} />
        <Stack.Screen name="Scout" component={ScoutScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="ScoutAnimation" component={ScoutAnimationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
