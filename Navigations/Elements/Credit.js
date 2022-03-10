import { Text, View, TouchableOpacity } from "react-native";

const Credit = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,

        width: "100%",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#aaa", fontSize: 10 }}>
        Copyright © 2022 Studio22 - All Rights Reserved.{" "}
      </Text>
    </View>
  );
};

export default Credit;
