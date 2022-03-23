import { Text, View } from "react-native";

import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";

export default function AddScreen({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext="Control Center" largetext="Add Device" />
      </View>

      <Text
        style={{
          marginLeft: 40,
          marginTop: "5%",
          marginBottom: "10%",
        }}
      >
        Add new device to your lovely home.
      </Text>

      <View style={{ marginVertical: "10%" }}>
        <IOTTextInput placeholder="Device code" />
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 40,
            width: "60%",
            fontSize: 12,
          }}
        >
          You can find your device manufacturer code attached to your device
          body. It's a 7-character code.
        </Text>

        <IOTTextInput placeholder="Set device name" secureTextEntry={true} />
      </View>

      <IOTButton
        text="Add Device"
        onPress={() => navigation.navigate("HomeScreen")}
      />

      <Credit />
    </View>
  );
}
