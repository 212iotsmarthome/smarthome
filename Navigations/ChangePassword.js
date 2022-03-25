import { Text, View } from "react-native";
import React, { useState } from "react";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import IOTTextInput from "./Elements/IOTTextInput";
import Credit from "./Elements/Credit";
import { AuthContext } from "../Firebase/AuthProvider";
import { AppContext } from "../Firebase/AppProvider";


export default function CPcreen({navigation}) {
  const { user, changePassword } = React.useContext(AuthContext);
  const { status, selectDevice, setCurSelection} = React.useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <IOTTextInput value={password} onChangeText={(text) => {setPassword(text);}} placeholder="Password" secureTextEntry={true} />
      </View>

      <IOTButton text="Change password" onPress={() => changePassword(password)}/>
      <Credit />
    </View>
  );
}
