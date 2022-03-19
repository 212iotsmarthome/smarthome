import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthProvider from "./Firebase/AuthProvider";
import AppProvider from "./Firebase/AppProvider";
import { navigationRef } from "./RootNavigation";

import WelcomeScreen from "./Navigations/WelcomeScreen";
import LoginScreen from "./Navigations/LoginScreen";
import SignupScreen from "./Navigations/SignupScreen";
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
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  return (
    <>
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <AppProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignupScreen}
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
        </AppProvider>
      </AuthProvider>
    </NavigationContainer>
    </>
  );

}
