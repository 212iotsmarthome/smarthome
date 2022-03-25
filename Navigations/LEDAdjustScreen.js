import React from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { AppContext } from "../Firebase/AppProvider";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";

export default function LEDAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const LED = route.params;
  const [isConnected, setIsConnected] = React.useState(true);
  const [isOn, setIsOn] = React.useState(false);
  const [isAuto, setIsAuto] = React.useState(false);
  const [brightness, setBrightness] = React.useState(1);

  const { selectedDevice, selectedDeviceInfo } = React.useContext(AppContext);
  console.log(selectedDevice, selectedDeviceInfo);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="LED Adjustment" largetext={LED.name} />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "10%",
            height: "20%",
            width: "50%",
            resizeMode: "contain",
          }}
          source={require("../assets/ceiling-lamp.png")}
        />

        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            backgroundColor: "#F1F9FD",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Power
            </Text>
          </View>

          <View
            style={{
              width: "30%",

              position: "absolute",
              right: "0%",
              alignItems: "center",
            }}
          >
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                height: 80,
              }}
              thumbColor={isOn ? "#29ABE2" : "#eee"}
              trackColor={{ true: "#C8E6EC", false: "#ccc" }}
              value={isOn}
              onValueChange={() => setIsOn(!isOn)}
            />
          </View>
        </TouchableOpacity>

        <View style={{ width: "73%", alignSelf: "center", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: isOn ? "black" : "#aaa",
              marginBottom: 10,
              marginTop: "5%",
            }}
          >
            {"Brightness: " +
              (brightness == 1 ? "Low" : brightness == 2 ? "Medium" : "High")}
          </Text>

          <Slider
            width="100%"
            maximumValue={3}
            minimumValue={1}
            step={1}
            minimumTrackTintColor={isOn ? "#29ABE2" : "#ccc"}
            thumbStyle={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "white",
              elevation: 8,
            }}
            value={brightness}
            onValueChange={setBrightness}
            disabled={!isOn}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Set time
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        <IOTButton
          text="Save"
          onPress={() => {
            navigation.navigate("LEDScreen");
          }}
        />
      </View>
    </View>
  );
}
