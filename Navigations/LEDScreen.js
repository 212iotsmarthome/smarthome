import React from "react";
import { ScrollView, View } from "react-native";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import LEDButton from "./Elements/LEDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";
import BackButton from "./Elements/BackButton";

export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};

  const { user } = React.useContext(AuthContext);
  const { status, selectDevice, setCurSelection } =
    React.useContext(AppContext);
  const [isConnected, setIsConnected] = React.useState(true);
  // const [LEDs, setLEDs] = React.useState(selectDevice);
  const [LEDs, setLEDs] = React.useState([
    {
      ID: "1000001",
      name: "Phòng khách",
      type: "LED-01A",
    },
  ]);

  function LEDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

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
        {/* <BackButton onPress={() => navigation.goBack()} /> */}
      </View>

      <LEDDiv length={LEDs.length} />
    </ScrollView>
  );
}
