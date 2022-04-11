import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
<<<<<<< HEAD
import { Snackbar } from "react-native-paper";
import { controlCurtain } from "../Controller/controller";
import { AppContext } from "../Firebase/AppProvider";
=======
import { controlCurtain, getCurtainStatus } from "../Controller/controller";
>>>>>>> a9bc09484395b0926210a72f426276dd80ef4a2e
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";

export default function AUAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const actList = ["Close", "Half-open", "Full-open"];

  const [visible, setVisible] = React.useState(Boolean(false));
  const [selectedAction, setSelectedAction] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(true);
  const [isClosed, setIsClosed] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);
  const { selectedDevice, selectedDeviceInfo } = React.useContext(AppContext);

  React.useEffect(() => {
    let isMounted = true
    getCurtainStatus(selectedDevice.boardID, selectedDevice.index).then((data) => {
      console.log(data)
      setSelectedAction(data)
    })
    return () => { isMounted = false };
  }, [])


  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo
          smalltext="Auto Curtain Adjustment"
          largetext={selectedDevice.name}
        />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "10%",
            height: "22%",
            width: "40%",
            resizeMode: "contain",
          }}
          source={require("../assets/smart-curtain.png")}
        />

        <View
          style={{
            height: 70,
            width: "82%",
            backgroundColor: "#F1F9FD",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Open/Close
            </Text>
          </View>

          <View
            style={{
              width: "30%",

              position: "absolute",
              right: "8%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={selectedAction}
              style={{
                height: 50,
                width: 145,
              }}
              onValueChange={(itemValue, itemPosition) =>
                setSelectedAction(itemValue)
              }
            >
              {actList.map((act, index) => {
                return (
                  <Picker.Item label={act + "  "} value={index} key={index} />
                );
              })}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",

            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={() =>
            navigation.navigate("SetTimeScreen", { obj: AU, type: "AU" })
          }
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Set time
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
<<<<<<< HEAD
        <IOTButton text="Save" onPress={() => {
          // controlCurtain(selectedDevice.index, selectedDevice.boardID, selectedAction);
          console.log(selectedDevice.index, selectedDevice.boardID, selectedAction);
          navigation.goBack();
        }} />
=======
        <IOTButton
          text="Save"
          onPress={() => {
            controlCurtain(
              selectedDevice.index,
              selectedDevice.boardID,
              selectedAction
            );
            console.log(
              selectedDevice.index,
              selectedDevice.boardID,
              selectedAction
            );
            // navigation.goBack();
            setVisible(true);
          }}
        />
>>>>>>> ab0705421219eb18b605f29378e400e5a92edc02
      </View>

      <Snackbar
        style={{
          borderRadius: 15,
          bottom: 20,
          width: "90%",
          alignSelf: "center",
          opacity: 0.85,
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
      //action
      >
        Change saved.
      </Snackbar>
    </View>
  );
}
