import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTDeviceGroupCard from "./Elements/IOTDeviceGroupCard";
import IOTButton from "./Elements/IOTButton";
import AvatarButton from "./Elements/AvatarButton";
import { AuthContext } from "../Firebase/AuthProvider";

import Credit from "./Elements/Credit";
import { handleSignOut } from "../Firebase/utility";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = React.useState("Lorem");
  const [isConnected, setIsConnected] = React.useState(true);

  const { user } = React.useContext(AuthContext);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext={"Hello, " + user.name} largetext="Home" />
      </View>

      <AvatarButton />

      <IOTButton text="Log Out" onPress={() => handleSignOut(() => {})}/>

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
            onPress={() => navigation.navigate("LEDScreen")}
          />
          <IOTDeviceGroupCard
            title="AC"
            subtitle="Air Conditioner"
            name="air-conditioner"
            type="material-community"
            onPress={() => navigation.navigate("ACScreen")}
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
            onPress={() => navigation.navigate("SmartDoorScreen")}
          />
          <IOTDeviceGroupCard
            title="Auto Curtain"
            subtitle="Your privacy"
            name="window-open"
            type="material-community"
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
          />
          <IOTDeviceGroupCard
            title="Add Device"
            subtitle="Add smartness"
            name="add-circle-outline"
            type="material"
          />
        </View>
      </ScrollView>

      <Credit />
    </View>
  );
}
