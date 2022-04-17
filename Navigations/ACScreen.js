import React from "react";
import { View, Text, ScrollView } from "react-native";
import TopHeadTypo from "./Elements/TopHeadTypo";
import DeviceButton from "./Elements/DeviceButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";

export default function ACScreen({ navigation }) {
  const { status, selectName, selectDevice, setCurSelection } =
    React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  const [isConnected, setIsConnected] = React.useState(true);

  function ACDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        <View style={{ marginBottom: 60, width: "100%" }}>
          {selectName.map((AC) => (
            <DeviceButton
              type={"AC"}
              name={AC.name}
              id={AC.ID}
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
