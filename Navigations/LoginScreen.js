import { Text, View } from "react-native";
import { useState } from "react";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";
import { auth } from "../firebase";

export default function LIScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message))
  }

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

      <IOTButton text="Log In" onPress={handleSignUp}/>

      <Credit />
    </View>
  );
}
