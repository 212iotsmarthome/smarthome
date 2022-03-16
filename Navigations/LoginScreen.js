import { Text, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";
import { handleSignUp, handleSignIn, useLogIn } from "../Firebase/utility";

export default function LIScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useLogIn(() => {navigation.navigate("Home")})

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
        <IOTTextInput value={email} onChangeText={(text) => {setEmail(text);}} placeholder="Email" />
        <IOTTextInput value={password} onChangeText={(text) => {setPassword(text);}} placeholder="Password" secureTextEntry={true} />
      </View>

      <IOTButton text="Log In" onPress={() => handleSignIn(email, password)}/>
      <Credit />
    </View>
  );
}
