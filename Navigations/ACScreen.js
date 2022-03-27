import React from "react";
import { View, Text, ScrollView } from "react-native";
import TopHeadTypo from "./Elements/TopHeadTypo";
import ACButton from "./Elements/ACButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import { AppContext } from "../Firebase/AppProvider";

export default function ACScreen({ navigation }) {
  const { selectName, setCurSelection } = React.useContext(AppContext);
  const [isConnected, setIsConnected] = React.useState(true);

  function ACDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        {/* <Text
          style={{ left: "74%", marginBottom: 10, color: "#aaa", fontSize: 12 }}
        >
          On/Off
        </Text> */}

        <View style={{ marginBottom: 60, width: "100%" }}>
          {selectName.map((AC) => (
            <ACButton
              type={"AC"}
              name={AC.name}
              key={AC.ID}
              onMainPress={() => {
                setCurSelection(AC.ID);
                navigation.navigate("ACAdjustScreen");
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
        <TopHeadTypo smalltext={"Control Center"} largetext="Air Conditioner" />
      </View>

      <ACDiv length={selectName.length} />
    </ScrollView>
  );
}
