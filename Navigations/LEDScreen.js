import React from "react";
import { ScrollView, View } from "react-native";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import LEDButton from "./Elements/LEDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";


export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};

  const { user } = React.useContext(AuthContext);
  const { status, selectDevice, setCurSelection } = React.useContext(AppContext);
  const [isConnected, setIsConnected] = React.useState(true);
  // const [LEDs, setLEDs] = React.useState(selectDevice);
  const [LEDs, setLEDs] = React.useState([
    {
      type: "led-2",
      name: "Phong Khach",
      ID: "10000001"
    }
  ]);


  function LEDDiv(props) {
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
