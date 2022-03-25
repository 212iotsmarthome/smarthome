import { useState } from "react";
import { Text, View } from "react-native";
import { addDevice } from "../controller/controller";
import Credit from "./Elements/Credit";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import TopHeadTypo from "./Elements/TopHeadTypo";

export default function AddScreen({ navigation }) {
  const [deviceCode, setDeviceCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
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
          onChangeText={
            (text) => {
              setDeviceCode(text);
            }
          } />
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
          onChangeText={
            (text) => {
              setDeviceName(text);
            }
          } />
      </View>

      <IOTButton
        text="Add Device"
        onPress={() => {
          addDevice(deviceCode, deviceName);
          // navigation.navigate("HomeScreen")
          setDeviceCode("");
          setDeviceName("");
        }}
      />

      <Credit />
    </View>
  );
}
