import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Icon } from "react-native-elements";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";

export default function LEDAdjustScreen({ navigation, route }) {
  // const LEDinfo = {DeviceID: 1000001, DeviceName: "Phòng khách"};
  const LED = route.params;
  const [isConnected, setIsConnected] = React.useState(true);
  const [isClosed, setIsClosed] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="Auto Curtain Adjustment" largetext={LED.name} />

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
              right: "0%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsMoving(true);
                setTimeout(() => {
                  setIsClosed(!isClosed);
                }, 500);

                setTimeout(() => {
                  setIsMoving(false);
                }, 3000);
              }}
              style={{
                width: "90%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                name={isClosed ? "window-closed" : "window-open"}
                type="material-community"
                color={isClosed ? "#29ABE2" : "#cc0000"}
                size={36}
              />

              <ActivityIndicator
                color="#29ABE2"
                size={40}
                animating={isMoving ? true : false}
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "25%",
                  backgroundColor: isMoving ? "#F1F9FD" : null,
                }}
              ></ActivityIndicator>
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
        <IOTButton text="Save" />
      </View>
    </View>
  );
}
