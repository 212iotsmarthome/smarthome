import React from "react";
import { ScrollView, View } from "react-native";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import LEDButton from "./Elements/LEDButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";
import BackButton from "./Elements/BackButton";
import { removeDeviceFromUser } from "../Firebase/AUD";

export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const { selectName, setCurSelection } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  const [isConnected, setIsConnected] = React.useState(true);

  function LEDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        <View style={{ marginBottom: 60, width: "100%" }}>
          {selectName.map((LED) => (
            <LEDButton
              type={"LED"}
              name={LED.name}
              key={LED.ID}
              onMainPress={() => {
                setCurSelection(LED.ID);
                navigation.navigate("LEDAdjustScreen", LED);
              }}
              onDeletePress={() => removeDeviceFromUser(user.control, LED.ID)}
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

      <LEDDiv length={selectName.length} />
    </ScrollView>
  );
}
