import React from "react";
import { View, Text, ScrollView } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import LEDButton from "./Elements/LEDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import { AuthContext } from "../Firebase/AuthProvider";
import { AppContext } from "../Firebase/AppProvider";

export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};

  const { user } = React.useContext(AuthContext);
  const { status, selectDevice, setCurSelection} = React.useContext(AppContext);
  const [isConnected, setIsConnected] = React.useState(true);
  const [LEDs, setLEDs] = React.useState(selectDevice);

  function LEDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    async function postName(e) {
      e.preventDefault()
      try {
        await axios.post("http://localhost:4000/post_name", {
          name
        })
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <View>
        <View style={{ marginBottom: 60, width: "100%" }}>
          {LEDs.map((LED) => (
            <LEDButton
              type={LED.type}
              name={LED.name}
              key={LED.ID}
              onMainPress={() => {
                setCurSelection(LED.ID);
                navigation.navigate("LEDAdjustScreen", LED);
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
        <TopHeadTypo smalltext={"Control Center"} largetext="LED" />
      </View>

      <LEDDiv length={LEDs.length} />
    </ScrollView>
  );
}
