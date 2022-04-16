import React from "react";
import { View, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import DeviceButton from "./Elements/DeviceButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import { AppContext } from "../Firebase/AppProvider";

export default function SDScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const { selectName, setCurSelection } = React.useContext(AppContext);

  function SDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        <View style={{ marginBottom: 60, width: "100%" }}>
          {selectName.map((SD) => (
            <DeviceButton
              type={"Door"}
              name={SD.name}
              key={SD.ID}
              onMainPress={() => {
                setCurSelection(SD.ID);
                navigation.navigate("SDAdjustScreen");
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
        <TopHeadTypo smalltext={"Control Center"} largetext="Smart Door" />
      </View>

      <SDDiv length={selectName.length} />
    </ScrollView>
  );
}
