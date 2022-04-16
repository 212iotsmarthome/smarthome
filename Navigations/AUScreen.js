import React from "react";
import { View, Text, ScrollView } from "react-native";
import TopHeadTypo from "./Elements/TopHeadTypo";
import DeviceButton from "./Elements/DeviceButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import { AppContext } from "../Firebase/AppProvider";

export default function AUScreen({ navigation }) {
  const { selectName, setCurSelection } = React.useContext(AppContext);
  const [isConnected, setIsConnected] = React.useState(true);

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
          {selectName.map((AU) => (
            <DeviceButton
              type={"Auto Curtain"}
              name={AU.name}
              key={AU.ID}
              onMainPress={() => {
                setCurSelection(AU.ID);
                navigation.navigate("AUAdjustScreen");
              }}
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

      <AUDiv length={selectName.length} />
    </ScrollView>
  );
}
