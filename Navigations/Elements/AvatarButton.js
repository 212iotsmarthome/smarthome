import { View, TouchableOpacity, Image, Alert } from "react-native";

const AvaButton = ({
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
    <View
      style={{
        position: "absolute",
        top: 48,
        right: 40,
        width: 50,
        height: 50,
        borderRadius: 25,
      }}
    >
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginVertical: "5%",
          borderColor: "#ddd",
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Image
          height={50}
          width={50}
          style={{
            width: 40,
            height: 40,
            borderRadius: 25,
            resizeMode: "contain",
          }}
          source={require("../../assets/selfie.png")}
        />
      </TouchableOpacity>
      {/* <Button title="HERE" /> */}
    </View>
  );
};

export default AvaButton;
