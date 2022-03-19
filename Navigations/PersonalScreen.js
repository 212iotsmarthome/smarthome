import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import PersonalButton from "./Elements/PersonalButton";

export default function ACScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [user, setUser] = React.useState({
    id: "1911837",
    name: "C. D. PHONG",
    email: "phong.chung.543@hcmut.edu.vn",
  });

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: "white", flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Personal"} largetext="Settings" />
      </View>

      <View style={{ height: "25%" }}>
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
          source={require("../assets/selfie.png")}
        />
      </View>

      <Text
        style={{
          marginTop: "8%",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {user.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 16,
        }}
      >
        {"User ID: " + user.id}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 30,
          fontSize: 16,
        }}
      >
        {user.email}
      </Text>

      <PersonalButton name="View log" subtext="" icon="format-list-text" />
      <PersonalButton name="Edit contact" icon="at" backgroundColor="white" />

      <PersonalButton
        name="Change password"
        icon="asterisk"
        backgroundColor="white"
      />

      {/* <View style={{ height: 5, backgroundColor: "#eee" }} /> */}
    </ScrollView>
  );
}
