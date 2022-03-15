import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const THTypo = ({ smalltext = "Lorem", largetext = "Ipsum" }) => {
  return (
    <View
      style={{
        // backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 40,
      }}
    >
      <StatusBar hidden={true} />

      <Text
        style={{
          fontSize: 18,
          color: "#222",
          fontWeight: "bold",
          marginBottom: -5,
        }}
      >
        {smalltext}
      </Text>

      <Text
        style={{
          fontSize: 36,
          fontFamily: "Roboto",
          fontWeight: "bold",
          color: "#222",
        }}
      >
        {largetext}
      </Text>
    </View>
  );
};

export default THTypo;
