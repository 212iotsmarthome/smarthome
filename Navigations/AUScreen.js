import React from "react";
import { View, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import AUButton from "./Elements/AUButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";

export default function SDScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [AUs, setAUs] = React.useState([
    {
      id: 4000001,
      type: "AU-05A",
      name: "Phòng ngủ",
    },
  ]);

  function AUDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        {/* <Text
          style={{ left: "70%", marginBottom: 10, color: "#aaa", fontSize: 12 }}
        >
          Lock/Unlock
        </Text> */}

        <View style={{ marginBottom: 60, width: "100%" }}>
          {AUs.map((AU) => (
            <AUButton
              type={AU.type}
              name={AU.name}
              key={AU.id}
              onMainPress={() => navigation.navigate("AUAdjustScreen", AU)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Control Center"} largetext="Auto Curtain" />
      </View>

      <AUDiv length={AUs.length} />
    </ScrollView>
  );
}
