import React from "react";
import {
  Image, Switch, Text, TouchableOpacity, View
} from "react-native";
import { controlAlarm } from "../controller/controller";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";


export default function LEDAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const LED = route.params;
  const [isConnected, setIsConnected] = React.useState(true);
  const [isOn, setIsOn] = React.useState(false);
  const [temp, setTemp] = React.useState("25");

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="EnviSensor™ Adjustment" largetext={LED.name} />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "10%",
            height: "20%",
            width: "40%",
            resizeMode: "contain",
          }}
          source={require("../assets/envi-sensor.png")}
        />

        <TouchableOpacity
          style={{
            height: 120,
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
              Flammable gas alarm
            </Text>
            <Text style={{ fontSize: 12.5 }}>
              The alarm goes off when the flammable gas concentration crosses
              the threshhold, or when the temperature reaches 80°C.
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

        <View
          style={{
            height: 60,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 15,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Sensor
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: "auto", marginRight: "auto", width: "73%" }}>
          <Text>{"        "}Temperature:</Text>
          <Text>{"        "}Humidity:</Text>
          <Text>{"        "}Brightness:</Text>
          <Text>{"        "}Flammable gas:</Text>
        </View>
      </View>

      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        <IOTButton text="Save" onPress={() => {
          controlAlarm(LED.id, isOn);
        }} />
      </View>
    </View>
  );
}
