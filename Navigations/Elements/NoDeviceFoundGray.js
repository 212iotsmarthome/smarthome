import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

const NDFG = () => {
  return (
    <View>
      <Icon
        type="antdesign"
        name="warning"
        style={{
          alignSelf: "center",
          marginTop: "50%",
          marginBottom: 10,
        }}
        size={40}
        color="#aaa"
      />
      <Text
        style={{
          alignSelf: "center",
          color: "#aaa",
          fontSize: 22,
        }}
      >
        {" "}
        No device found{" "}
      </Text>

      <Text
        style={{
          alignSelf: "center",
          color: "#aaa",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Check your internet connection, or if{"\n"}you have added any device.
      </Text>
    </View>
  );
};

export default NDFG;
