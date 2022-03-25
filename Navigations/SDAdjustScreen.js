import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { controlDoor } from "../controller/controller";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";


export default function LEDAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const LED = route.params;
  const [isConnected, setIsConnected] = React.useState(true);
  const [isLocked, setIsLocked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="Smart Door Adjustment" largetext={LED.name} />

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
              onPress={() => setIsLocked(!isLocked)}
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
                color: "black",
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
            >
              <Icon
                name={isOpen ? "door-open" : "door-closed"}
                type="material-community"
                color={isOpen ? "#cc0000" : "#29ABE2"}
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
        <IOTButton text="Save" onPress={() => {
          controlDoor(LED.id, isLocked, isOpen)
        }} />
      </View>
    </View>
  );
}
