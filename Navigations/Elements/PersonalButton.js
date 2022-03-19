import React from "react";
import { Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Icon } from "react-native-elements";

const ACButton = ({
  name = "My Setting",
  subtext = "subtext",
  backgroundColor = "#fafafa",
  icon = "card-text-outline",
  onPress = () =>
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
        height: 70,
        width: "82%",
        backgroundColor: { backgroundColor },
        borderRadius: 20,
        paddingLeft: 20,

        marginRight: "auto",
        marginLeft: "auto",
        marginVertical: 5,

        justifyContent: "center",
        // alignItems: "flex-start",
      }}
      onPress={onPress}
    >
      <View style={{ left: "0%", position: "absolute", width: "25%" }}>
        <Icon
          name={icon}
          type="material-community"
          color={icon == "logout" ? "#c00" : "#888"}
          size={36}
        />
      </View>

      <View style={{ width: "70%", position: "absolute", left: "25%" }}>
        <Text
          style={{
            fontSize: 18,
            color: icon == "logout" ? "#c00" : "black",
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>

        {/* <Text
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: "bold",
          }}
          
        >
          {subtext}
        </Text> */}
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

export default ACButton;
