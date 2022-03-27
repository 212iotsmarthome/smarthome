import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import PersonalButton from "./Elements/PersonalButton";

import { AuthContext } from "../Firebase/AuthProvider";
import { handleSignOut } from "../Firebase/utility";

export default function ACScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const { user, setUser } = React.useContext(AuthContext);

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: "white", flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Personal"} largetext="Settings" />
      </View>

      <View style={{ height: "20%" }}>
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
          marginBottom: 25,
          fontSize: 16,
        }}
      >
        {user.email}
      </Text>

      <PersonalButton
        name="View log"
        subtext=""
        icon="format-list-text"
        onPress={() => navigation.navigate("LogScreen")}
      />

      <PersonalButton
        name="Change password"
        icon="asterisk"
        backgroundColor="white"
        onPress={() => navigation.navigate("ChangePasswordScreen")}
      />

      <PersonalButton
        name="About us"
        icon="at"
        backgroundColor="white"
        onPress={() => navigation.navigate("AboutUsScreen")}
      />

      <PersonalButton
        name="Log out"
        icon="logout"
        backgroundColor="white"
        onPress={() => handleSignOut(() => {})}
      />

      {/* <View style={{ height: 5, backgroundColor: "#eee" }} /> */}
    </ScrollView>
  );
}
