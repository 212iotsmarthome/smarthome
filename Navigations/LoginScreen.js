import React from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Text, View } from "react-native";
import { useState } from "react";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";
import { handleSignIn } from "../Firebase/utility";

export default function LIScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = React.useContext(AuthContext);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
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
        <IOTTextInput value={email} onChangeText={(text) => { setEmail(text); }} placeholder="Email" />
        <IOTTextInput value={password} onChangeText={(text) => { setPassword(text); }} placeholder="Password" secureTextEntry={true} />
      </View>

      <IOTButton text="Log In" onPress={() => {
        console.log(user);
        handleSignIn(email, password)
        // navigation.navigate("HomeScreen")
      }} />
      <Credit />
    </View>
  );
}
