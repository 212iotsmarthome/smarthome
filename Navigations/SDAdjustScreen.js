import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { controlDoor, getDoorStatus } from "../Controller/controller";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { Snackbar } from "react-native-paper";

export default function LEDAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const [isConnected, setIsConnected] = React.useState(true);

  const [visible, setVisible] = React.useState(Boolean(false));
  const [isLocked, setIsLocked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { selectedName, selectedDevice, selectedDeviceInfo } =
    React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    let isMounted = true;
    getDoorStatus(selectedDevice.boardID, selectedDevice.index).then((data) => {
      setIsOpen(data.motor == 0 ? false : true);
      setIsLocked(data.lock == 1 ? true : false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    if (isLocked) setIsOpen(false);
    return () => {
      isMounted = false;
    };
  }, [isLocked]);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo
          smalltext="Smart Door Adjustment"
          largetext={selectedName.name}
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
          source={require("../assets/smart-door.png")}
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
              Lock/Unlock
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
            <TouchableOpacity
              onPress={() => {
                setIsLocked(!isLocked);
                // if (isLocked == true) setIsOpen(false);
              }}
              style={{
                width: "90%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                name={isLocked ? "lock-outline" : "lock-open-outline"}
                type="material-community"
                color={isLocked ? "#29ABE2" : "#cc0000"}
                size={36}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: 70,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: isLocked ? "#ccc" : "black",
              }}
            >
              Open/Close door
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
            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={{
                width: "90%",
                height: "100%",
                justifyContent: "center",
              }}
              disabled={isLocked}
            >
              <Icon
                name={isOpen ? "door-open" : "door-closed"}
                type="material-community"
                color={isLocked ? "#ccc" : isOpen ? "#cc0000" : "#29ABE2"}
                size={36}
              />
            </TouchableOpacity>
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
          onPress={() => navigation.navigate("SetTimeScreen")}
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
        <IOTButton
          text="Save"
          onPress={() => {
            controlDoor(
              user.name,
              user.ID,
              selectedName.ID,
              selectedName.name,
              selectedDevice.index,
              selectedDevice.boardID,
              isLocked,
              isOpen
            );
            // console.log(
            //   selectedDevice.index,
            //   selectedDevice.boardID,
            //   isLocked,
            //   isOpen,
            //   createLog()
            // );
            // navigation.goBack();
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
