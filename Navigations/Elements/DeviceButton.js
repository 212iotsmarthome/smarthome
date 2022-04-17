import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";

const LEDButton = ({
  type = "Question",
  id = "What?",
  name = "My device?",
  onDeletePress = () => {},
  onMainPress = () =>
    Alert.alert("Not assigned yet", "In development", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]),
}) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        height: 80,
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
      onPress={onMainPress}
    >
      <View style={{ left: "0%", position: "absolute", width: "25%" }}>
        <Icon
          name={
            type == "LED"
              ? "lightbulb-outline"
              : type == "AC"
              ? "air-conditioner"
              : type == "Door"
              ? "door-open"
              : type == "Auto Curtain"
              ? "window-open"
              : type == "EnviSensor"
              ? "camera-control"
              : "account-question"
          }
          type={"material-community"}
          color="#29ABE2"
          size={36}
        />
      </View>

      <View style={{ width: "50%", position: "absolute", left: "25%" }}>
        <Text
          style={{
            fontSize: 14,
            color: "black",
          }}
        >
          {"ID: " + id}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>

      <View style={{ position: "absolute", right: "7%" }}>
        <Icon
          type="material-community"
          name="trash-can-outline"
          size={28}
          color="#29ABE2"
          onPress={() =>
            Alert.alert(
              "Warning",
              "Do you want to remove this device from your account?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                { text: "OK", onPress: onDeletePress },
              ]
            )
          }
        />
      </View>

      {/* <View
        style={{
          height: "70%",
          width: "0.3%",
          backgroundColor: "#D1E9E5",
          position: "absolute",
          right: "28%",
        }}
      >
        <Text></Text>
      </View>

      <View
        style={{
          width: "29.7%",
          position: "absolute",
          right: "0%",
          alignItems: "center",
        }}
      >
        <Switch
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          thumbColor={isEnabled ? "#29ABE2" : "#eee"}
          trackColor={{ true: "#C8E6EC", false: "#ccc" }}
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View> */}
    </TouchableOpacity>
  );
};

export default LEDButton;
