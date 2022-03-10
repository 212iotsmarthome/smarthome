import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import WelcomeScreen from "./Navigations/WelcomeScreen";
import LoginScreen from "./Navigations/LoginScreen";

export default function App() {
  // return <WelcomeScreen />;
  return <LoginScreen />;
}
