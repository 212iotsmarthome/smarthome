import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import WelcomeScreen from "./Navigations/WelcomeScreen";
import LoginScreen from "./Navigations/LoginScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <WelcomeScreen />;
}
