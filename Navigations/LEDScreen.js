import React from "react";
import { ScrollView, View, BackHandler } from "react-native";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import DeviceButton from "./Elements/DeviceButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { removeDevice } from "../Firebase/AUD";

export default function LEDScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const { selectName, setCurSelection } = React.useContext(AppContext);
  const { user, getUser } = React.useContext(AuthContext);
  const [ isConnected, setIsConnected ] = React.useState(true);

  function LEDDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        <View style={{ marginBottom: 60, width: "100%" }}>
          {selectName.map((LED) => (
            <DeviceButton
              type={"LED"}
              name={LED.name}
              id={LED.ID}
              key={LED.ID}
              onMainPress={() => {
                setCurSelection(LED.ID);
                navigation.navigate("LEDAdjustScreen", LED);
              }}
              onDeletePress={() => {
                removeDevice({
                  uid: user.id, 
                  control: user.control, 
                  deviceID: LED.ID
                });
                getUser(user.email);
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

      <LEDDiv length={selectName.length} />
    </ScrollView>
  );
}
