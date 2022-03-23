import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";

const AUButton = ({
  type = "AU",
  name = "My AU",
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
  const [isClosed, setIsClosed] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);
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
          name="camera-control"
          type="material-community"
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
          {type}
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
          type="material"
          name="delete-outline"
          size={28}
          color="#29ABE2"
          onPress={() => {}}
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
      ></View>

      <View
        style={{
          width: "29.7%",
          height: "100%",
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
              top: "25%",
              left: "25%",
              backgroundColor: isMoving ? "#F1F9FD" : null,
            }}
          ></ActivityIndicator>
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
};

export default AUButton;
