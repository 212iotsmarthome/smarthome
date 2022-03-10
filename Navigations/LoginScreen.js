import { Text, View } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";

export default function LIScreen() {
  return (
    <View style={{ height: "100%" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext="" largetext="Login" />
      </View>

      <Text
        style={{
          marginLeft: 40,
          marginTop: "5%",
          marginBottom: "10%",
        }}
      >
        Connective. Efficient. Satisfying. Instant.
      </Text>

      <View style={{ marginVertical: "15%" }}>
        <IOTTextInput placeholder="Email" />
        <IOTTextInput placeholder="Password" secureTextEntry={true} />
      </View>

      <IOTButton text="Log In" />

      <Credit />
    </View>
  );
}
