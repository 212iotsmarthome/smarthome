import { View, Image } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import Credit from "./Elements/Credit";

export default function WCScreen({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: "#f8f8f8" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo
          smalltext="Hello. This is CESI."
          largetext="Getting Started"
        />
      </View>

      <Image
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20%",
          marginBottom: "20%",
          height: "30%",
          width: "50%",
          resizeMode: "contain",
        }}
        source={require("../assets/smartphone.png")}
      />

      <IOTButton
        text="Log In"
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <IOTButton
        text="Sign Up"
        type="white"
        onPress={() => navigation.navigate("SignUpScreen")}
      />
      <Credit />
    </View>
  );
}
