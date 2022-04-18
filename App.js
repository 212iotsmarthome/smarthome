import React from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthProvider from "./Firebase/AuthProvider";
import AppProvider from "./Firebase/AppProvider";
// import { AppContext } from "./Firebase/AppProvider";
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
import SetTimeScreen from "./Navigations/SetTimeScreen";

import ChangePasswordScreen from "./Navigations/ChangePasswordScreen";
import LogScreen from "./Navigations/LogScreen";
import AboutUsScreen from "./Navigations/AboutUsScreen";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  // const { logList, deviceList, selectName } = React.useContext(
  //   AppProvider.AppContext.Pro
  // );
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  // React.useEffect(() => {}, [logList]);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

              <Stack.Screen
                name="SetTimeScreen"
                component={SetTimeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="LogScreen"
                component={LogScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AboutUsScreen"
                component={AboutUsScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </AppProvider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("HERE IS THE TOKEN: " + token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
