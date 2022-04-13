import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";
import { getEnviData } from "../controller/controller";

import { handleSignUp } from "../Firebase/utility";

export default function SUScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(async () => {
    const res = await getEnviData("0", "board1", 3);
    console.log(res.data);
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: "10%" }}>
        <TopHeadTypo smalltext="" largetext="Sign Up" />
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
        <IOTTextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
        />
        <IOTTextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
          secureTextEntry={true}
        />
        <IOTTextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="Your name"
        />
      </View>

      <IOTButton
        text="Sign Up"
        onPress={() => handleSignUp(email, password, name)}
      />
      <Credit />
    </View>
  );
}
