import React, { useState } from "react";
import { Text, View } from "react-native";
import Credit from "./Elements/Credit";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { AuthContext } from "../Firebase/AuthProvider";
import { AppContext } from "../Firebase/AppProvider";
import * as RootNavigation from "../RootNavigation";
import { editDocumentById } from "../Firebase/service";

export default function AddScreen({ navigation }) {
  const [deviceCode, setDeviceCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const { user, getUser } = React.useContext(AuthContext);
  const { devList, control } = React.useContext(AppContext);

  const checkIf = async (dC, dN) => {
    if (devList.includes(dC)) {
      try {
        // console.log(user.control);
        if (user.control == []) {
          await editDocumentById("User", user.id, {
            control: [{ ID: dC, name: dN }],
          });
        } else {
          let result = [];
          for (let i = 0; i < user.control.length; i++) {
            result.push({ ID: user.control[i].ID, name: user.control[i].name });
          }
          result.push({ ID: dC, name: dN });
          await editDocumentById("User", user.id, {
            control: result,
          });
        }
        getUser(user.email);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Device ID not exist!");
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext="Control Center" largetext="Add Device" />
      </View>

      <Text
        style={{
          marginLeft: 40,
          marginTop: "5%",
          marginBottom: "10%",
        }}
      >
        Add new device to your lovely home.
      </Text>

      <View style={{ marginVertical: "10%" }}>
        <IOTTextInput
          placeholder="Device code"
          value={deviceCode}
          onChangeText={(text) => {
            setDeviceCode(text);
          }}
        />
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 40,
            width: "60%",
            fontSize: 12,
          }}
        >
          You can find your device manufacturer code attached to your device
          body. It's a 7-character code.
        </Text>

        <IOTTextInput
          value={deviceName}
          placeholder="Set device name"
          secureTextEntry={false}
          onChangeText={(text) => {
            if (text.length < 15) {
              setDeviceName(text);
            }
          }}
        />
      </View>

      <IOTButton
        text="Add Device"
        onPress={() => {
          checkIf(deviceCode, deviceName);
          RootNavigation.navigate("HomeScreen");
          setDeviceCode("");
          setDeviceName("");
        }}
      />

      <Credit />
    </View>
  );
}
