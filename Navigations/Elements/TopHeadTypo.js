import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const THTypo = ({ smalltext = "Lorem", largetext = "Ipsum" }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // marginTop: 60,
        marginLeft: 40,
      }}
    >
      <StatusBar style="inverted" />

      <Text style={{ fontSize: 18, color: "#222" }}> {smalltext} </Text>

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
