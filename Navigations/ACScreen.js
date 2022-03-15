import React from "react";
import { View, Text, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import ACButton from "./Elements/ACButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";

export default function ACScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [ACs, setACs] = React.useState([
    {
      id: 2000001,
      type: "AC-07N",
      name: "Phòng ngủ",
    },
  ]);

  function ACDiv(props) {
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
          {ACs.map((AC) => (
            <ACButton
              type={AC.type}
              name={AC.name}
              key={AC.id}
              onMainPress={() => navigation.navigate("ACAdjustScreen", AC)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Control Center"} largetext="Air Conditioner" />
      </View>

      <ACDiv length={ACs.length} />
    </ScrollView>
  );
}
