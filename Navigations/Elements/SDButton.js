import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";

const SDButton = ({
  type = "SD",
  name = "My SD",
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
  const [isLocked, setIsLocked] = React.useState(false);
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
          name="door-open"
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

      <View
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
    </TouchableOpacity>
  );
};

export default SDButton;
