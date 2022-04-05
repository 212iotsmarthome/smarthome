import { Text, View, TouchableOpacity } from "react-native";

const BackButton = ({ onPress = () => {} }) => {
  return (
    <View
      style={{
        position: "absolute",
        flexDirection: "row",
        right: "10%",
      }}
    >
      <TouchableOpacity onPress={() => onPress}>
        <Text
          style={{
            fontSize: 18,
            color: "#29ABE2",
            fontWeight: "bold",
          }}
        >
          {"< Back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
