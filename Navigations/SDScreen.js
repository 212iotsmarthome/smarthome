import React from "react";
import { View, Text, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import SDButton from "./Elements/SDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";

export default function SDScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [SDs, setSDs] = React.useState([
    {
      id: 3000001,
      type: "SD-05A",
      name: "Cửa chính",
    },
  ]);

  function SDDiv(props) {
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
          {SDs.map((SD) => (
            <SDButton
              type={SD.type}
              name={SD.name}
              key={SD.id}
              onMainPress={() => navigation.navigate("SDAdjustScreen", SD)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Control Center"} largetext="Smart Door" />
      </View>

      <SDDiv length={SDs.length} />
    </ScrollView>
  );
}
