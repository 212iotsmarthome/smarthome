import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";

const IOTButton = ({
  title = "My Button",
  subtitle = "My subtitle",
  name = "lightbulb-outline",
  type = "material-community",
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
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 135,
        width: "100%",
        backgroundColor: title == "Add Device" ? "white" : "#F1F9FD",

        borderColor: title == "Add Device" ? "#F1F9FD" : "transparent",
        borderWidth: 2.5,

        borderRadius: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        marginRight: 5,
        marginLeft: 5,

        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
      onPress={onPress}
    >
      <Icon
        name={name}
        type={type}
        // color={title == "Add Device" ? "#F1F9FD" : "#29ABE2"}
        color="#29ABE2"
        size={36}
        style={{ marginBottom: 10 }}
      />

      <Text
        style={{
          fontSize: 18,
          // color: title == "Add Device" ? "#F1F9FD" : "black",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 14,
          // color: title == "Add Device" ? "#F1F9FD" : "black",
          color: "black",
        }}
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
    // </View>
  );
};

export default IOTButton;
