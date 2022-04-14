import React from "react";
const axios = require("axios");
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { Snackbar } from "react-native-paper";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";

import { controlLED, getLEDStatus } from "../Controller/controller";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";


export default function LEDAdjustScreen({ navigation }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  // const [isConnected, setIsConnected] = React.useState(true);
  const [visible, setVisible] = React.useState(Boolean(false));
  const [isOn, setIsOn] = React.useState(false);
  const [brightness, setBrightness] = React.useState(1);
  const { selectedName, selectedDevice, selectedDeviceInfo } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    let isMounted = true
    getLEDStatus(selectedDevice.boardID, selectedDevice.index).then((bright) => {
      setBrightness(bright)
      if (bright > 0) { setIsOn(true) }

    })
    return () => { isMounted = false };
  }, [])

  const getValue = () => {
    if (!isOn) {
      return 0;
    } else {
      if (brightness == 1) {
        return 1;
      }
      if (brightness == 2) {
        return 2;
      }
      if (brightness == 3) {
        return 3;
      }
      return 4;
    }
  };  

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="LED Adjustment" largetext={selectedName.name} />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "10%",
            height: "20%",
            width: "50%",
            resizeMode: "contain",
          }}
          source={require("../assets/ceiling-lamp.png")}
        />

        <TouchableOpacity
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
              Power
            </Text>
          </View>

          <View
            style={{
              width: "30%",

              position: "absolute",
              right: "0%",
              alignItems: "center",
            }}
          >
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                height: 80,
              }}
              thumbColor={isOn ? "#29ABE2" : "#eee"}
              trackColor={{ true: "#C8E6EC", false: "#ccc" }}
              value={isOn}
              onValueChange={() => setIsOn(!isOn)}
            />
          </View>
        </TouchableOpacity>

        <View style={{ width: "73%", alignSelf: "center", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: isOn ? "black" : "#aaa",
              marginBottom: 10,
              marginTop: "5%",
            }}
          >
            {"Brightness: " +
              (brightness == 1 ? "Low" : brightness == 2 ? "Medium" : "High")}
          </Text>

          <Slider
            width="100%"
            maximumValue={3}
            minimumValue={1}
            step={1}
            minimumTrackTintColor={isOn ? "#29ABE2" : "#ccc"}
            thumbStyle={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "white",
              elevation: 8,
            }}
            value={brightness}
            onValueChange={(value) => setBrightness(value[0])}
            disabled={!isOn}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={() =>
            navigation.navigate("SetTimeScreen", {
              obj: selectedDeviceInfo,
              type: "LED",
            })
          }
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Set time
            </Text>
          </View>

          <View
            style={{
              width: "30%",
              position: "absolute",
              right: "0%",
              alignItems: "center",
            }}
          ></View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        <IOTButton
          text="Save"
          onPress={() => {
            controlLED(
              user.name,
              user.ID,
              selectedName.ID,
              selectedName.name,
              selectedDevice.index,
              selectedDevice.boardID,
              getValue()
            );
            console.log(
              selectedDevice.index,
              selectedDevice.boardID,
              getValue(),
            );
            setVisible(true);
          }}
        />
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