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
import SDScreen from "./Navigations/SDScreen";
import SDAdjustScreen from "./Navigations/SDAdjustScreen";
import AUScreen from "./Navigations/AUScreen";
import AUAdjustScreen from "./Navigations/AUAdjustScreen";
import ESScreen from "./Navigations/ESScreen";
import ESAdjustScreen from "./Navigations/ESAdjustScreen";
import AddDeviceScreen from "./Navigations/AddDeviceScreen";
import PersonalScreen from "./Navigations/PersonalScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // return <WelcomeScreen />;
  // return <LoginScreen />;
  // return <HomeScreen />;
  // return <LEDScreen />;
  // return <ACScreen />;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LEDScreen"
            component={LEDScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LEDAdjustScreen"
            component={LEDAdjustScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ACScreen"
            component={ACScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ACAdjustScreen"
            component={ACAdjustScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SDScreen"
            component={SDScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SDAdjustScreen"
            component={SDAdjustScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AUScreen"
            component={AUScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AUAdjustScreen"
            component={AUAdjustScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ESScreen"
            component={ESScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ESAdjustScreen"
            component={ESAdjustScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddDeviceScreen"
            component={AddDeviceScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PersonalScreen"
            component={PersonalScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
