import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import Credit from "./Elements/Credit";

export default function ACScreen({ navigation }) {
  return (
    <View
      style={{ height: "100%", backgroundColor: "white", flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Personal"} largetext="About us" />
      </View>

      <View style={{ height: "20%", marginBottom: 20 }}>
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: -40,
            height: "150%",
            width: "100%",
            resizeMode: "center",
          }}
          // source={require("../assets/info.png")}
          source={require("../assets/cesilogo_clear.png")}
        />
      </View>

      <Text style={style.bigtext}>{"Chung Đông Phong"}</Text>
      <Text style={style.smalltext}>{"1911837"}</Text>

      <Text style={style.bigtext}>{"Nguyễnn Phúc Thịnh"}</Text>
      <Text style={style.smalltext}>{"1910565"}</Text>

      <Text style={style.bigtext}>{"Nguyễn Minh Nghĩa"}</Text>
      <Text style={style.smalltext}>{"1914316"}</Text>

      <Text style={style.bigtext}>{"Diệp Trần Nam"}</Text>
      <Text style={style.smalltext}>{"1914213"}</Text>

      <Text style={style.bigtext}>{"Trần Ngọc Cát"}</Text>
      <Text style={style.smalltext}>{"1912750"}</Text>

      <Credit />
    </View>
  );
}

const style = StyleSheet.create({
  bigtext: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  smalltext: {
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 2,
    fontSize: 14,
    textAlign: "center",
  },
});
