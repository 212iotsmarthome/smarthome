import React from "react";
import { View, Text, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import LEDButton from "./Elements/LEDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";

export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};

  const [isConnected, setIsConnected] = React.useState(true);
  const [LEDs, setLEDs] = React.useState([
    {
      id: 1000001,
      type: "LED-21A",
      name: "Phòng khách",
    },
    {
      id: 1000002,
      type: "LED-21A",
      name: "Phòng khách 2",
    },
    {
      id: 1100002,
      type: "LED-8K",
      name: "Phòng ngủ",
    },
    {
      id: 1000004,
      type: "LED-21A",
      name: "Restroom",
    },
    {
      id: 1000005,
      type: "LED-21A",
      name: "Phòng khách",
    },
    {
      id: 1000006,
      type: "LED-21A",
      name: "Phòng khách 2",
    },
    {
      id: 1100007,
      type: "LED-8K",
      name: "Phòng ngủ",
    },
    {
      id: 1000008,
      type: "LED-21A",
      name: "Restroom",
    },
    {
      id: 1000009,
      type: "LED-21A",
      name: "Restroom",
    },
  ]);

  function LEDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        <Text
          style={{ left: "74%", marginBottom: 10, color: "#aaa", fontSize: 12 }}
        >
          On/Off
        </Text>

        <View style={{ marginBottom: 60, width: "100%" }}>
          {LEDs.map((LED) => (
            <LEDButton
              type={LED.type}
              name={LED.name}
              key={LED.id}
              onMainPress={() => navigation.navigate("LEDAdjustScreen", LED)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Control Center"} largetext="LED" />
      </View>
      <LEDDiv length={LEDs.length} />
    </ScrollView>
  );
}
