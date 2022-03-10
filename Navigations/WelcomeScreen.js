import { View, Image } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import Credit from "./Elements/Credit";

export default function WCScreen() {
  return (
    <View style={{ height: "100%" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo
          smalltext="Hello. This is CESI."
          largetext="Let's Get Started"
        />
      </View>

      <Image
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10%",
          marginBottom: "20%",
          height: "35%",
          resizeMode: "contain",
        }}
        source={require("../assets/livingroom.png")}
      />

      <IOTButton text="Log In" />
      <IOTButton text="Sign Up" type="white" />

      <Credit />
    </View>
  );
}
