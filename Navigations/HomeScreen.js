import { View, Image, TouchableOpacity, ScrollView, BackHandler, Alert } from "react-native";
import React, {useEffect} from "react";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTDeviceGroupCard from "./Elements/IOTDeviceGroupCard";
import AvatarButton from "./Elements/AvatarButton";
import { AuthContext } from "../Firebase/AuthProvider";
import { AppContext } from "../Firebase/AppProvider";

import Credit from "./Elements/Credit";

export default function HomeScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const { user } = React.useContext(AuthContext);
  const { setStatus, control } = React.useContext(AppContext);

  // const backHome = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backHome);
  //   return () => BackHandler.removeEventListener("hardwareBackPress", backHome);
  // }, []);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext={"Hello, " + user.name} largetext="Home" />
      </View>
      <AvatarButton onPress={() => navigation.navigate("PersonalScreen")} />

      {/* <IOTButton text="Log Out" onPress={() => handleSignOut(() => {})}/>
      <IOTButton text="DD" onPress={() => navigation.navigate("CP")}/> */}

      <Image
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          height: "20%",
          width: "50%",
          resizeMode: "contain",
          marginBottom: 30,
        }}
        source={require("../assets/livingroom.png")}
        onPress={() => navigation.navigate("CP")}
      />

      <ScrollView style={{ marginBottom: 60 }}>
        <View
          style={{
            marginVertical: 0,
            width: "85%",
            height: 135,
            alignSelf: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <IOTDeviceGroupCard
            title="LED"
            subtitle="Control lights"
            name="lightbulb-outline"
            type="material-community"
            onPress={() => {
              setStatus(1);
              navigation.navigate("LEDScreen");
            }}
          />
          <IOTDeviceGroupCard
            title="AC"
            subtitle="Air Conditioner"
            name="air-conditioner"
            type="material-community"
            onPress={() => {
              setStatus(2);
              navigation.navigate("ACScreen");
            }}
          />
        </View>

        <View
          style={{
            marginVertical: 0,
            width: "85%",
            height: 135,
            alignSelf: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <IOTDeviceGroupCard
            title="Smart Door"
            subtitle="Secure your home"
            name="door-open"
            type="material-community"
            onPress={() => {
              setStatus(7);
              navigation.navigate("SDScreen");
            }}
          />
          <IOTDeviceGroupCard
            title="Auto Curtain"
            subtitle="Your privacy"
            name="window-open"
            type="material-community"
            onPress={() => {
              setStatus(6);
              navigation.navigate("AUScreen");
            }}
          />
        </View>

        <View
          style={{
            marginVertical: 0,
            width: "85%",
            height: 135,
            alignSelf: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <IOTDeviceGroupCard
            title="EnviSensor™"
            subtitle="At any time"
            name="camera-control"
            type="material-community"
            onPress={() => {
              setStatus(3);
              navigation.navigate("ESScreen");
            }}
          />
          <IOTDeviceGroupCard
            title="Add Device"
            subtitle="Add smartness"
            name="add-circle-outline"
            type="material"
            onPress={() => navigation.navigate("AddDeviceScreen")}
          />
        </View>
      </ScrollView>

      <Credit />
    </View>
  );
}
