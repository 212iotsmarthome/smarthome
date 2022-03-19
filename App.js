import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./Navigations/WelcomeScreen";
import LoginScreen from "./Navigations/LoginScreen";
import HomeScreen from "./Navigations/HomeScreen";
import LEDScreen from "./Navigations/LEDScreen";
import LEDAdjustScreen from "./Navigations/LEDAdjustScreen";
import ACScreen from "./Navigations/ACScreen";
import ACAdjustScreen from "./Navigations/ACAdjustScreen";
import SmartDoorScreen from "./Navigations/SmartDoorScreen";
import SDAdjustScreen from "./Navigations/SDAdjustScreen";
import AutoCurtainScreen from "./Navigations/AutoCurtainScreen";

import AUAdjustScreen from "./Navigations/AUAdjustScreen";
import LogScreen from "./Navigations/LogScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // return <WelcomeScreen />;
  // return <LoginScreen />;
  // return <HomeScreen />;
  // return <LEDScreen />;
  // return <ACScreen />;
  return <LogScreen></LogScreen>

  // return (
  //   <>
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen
  //           name="WelcomeScreen"
  //           component={WelcomeScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="LoginScreen"
  //           component={LoginScreen}
  //           options={{ headerShown: false }}
  //         />
  //         <Stack.Screen
  //           name="HomeScreen"
  //           component={HomeScreen}
  //           options={{ headerShown: false }}
  //         />
  //         <Stack.Screen
  //           name="LEDScreen"
  //           component={LEDScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="LEDAdjustScreen"
  //           component={LEDAdjustScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="ACScreen"
  //           component={ACScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="ACAdjustScreen"
  //           component={ACAdjustScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="SmartDoorScreen"
  //           component={SmartDoorScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="SDAdjustScreen"
  //           component={SDAdjustScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="AutoCurtainScreen"
  //           component={AutoCurtainScreen}
  //           options={{ headerShown: false }}
  //         />

  //         <Stack.Screen
  //           name="AUAdjustScreen"
  //           component={AUAdjustScreen}
  //           options={{ headerShown: false }}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </>
  // );
}
