import React from "react";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import TopHeadTypo from "./Elements/TopHeadTypo";
import Credit from "./Elements/Credit";

import { AuthContext } from "../Firebase/AuthProvider";

export default function ACScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const { user, changePassword } = React.useContext(AuthContext);

  const alertMsg = (msg) => {
    Alert.alert("Alert", msg);
  };

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: "white", flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Personal"} largetext="Password" />
      </View>

      <Image
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10%",
          height: "15%",
          width: "40%",
          resizeMode: "contain",
        }}
        source={require("../assets/password.png")}
      />

      <View style={{ marginBottom: "5%" }}>
        <IOTTextInput
          placeholder="Old password"
          value={currentPassword}
          onChangeText={(text) => {
            setCurrentPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>

      <View style={{ marginBottom: "10%" }}>
        <IOTTextInput
          placeholder="New password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
          }}
          secureTextEntry={true}
        />

        <IOTTextInput
          placeholder="Repeat new password"
          value={repeatPassword}
          onChangeText={(text) => {
            setRepeatPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>

      <IOTButton
        text="Change password"
        onPress={() => {
          if (newPassword == repeatPassword) {
            var msg = changePassword(currentPassword, newPassword);
            //   alertMsg(msg); ch??a l??m ???????c kh??c catch error, do AuthProvider
            //   return 1 script, m?? thrown msg k ra kh???i 1 script ????? b??? catch dc.
            //   ???? th??? return message, v???i th??m msg v??o value c???a script tr??? v???,
            //   ?????u k dc.
            navigation.goBack();
          } else if (repeatPassword != "") {
            alertMsg("Please repeat your new password correctly!");
          } else {
            alertMsg("Please repeat your new password");
          }
        }}
      />

      <Credit />
    </ScrollView>
  );
}
