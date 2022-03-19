import React from "react";
import { Text, View, TextInput } from "react-native";

const IOTTextInput = ({
  value,
  placeholder = "Aa",
  keyboardType = "default",
  secureTextEntry = false,
  onChangeText,
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View
      style={{
        marginVertical: 0,
        width: "70%",
        height: 70,
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          width: "100%",
          height: 55,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isFocus ? "#29ABE2" : "#ccc",
          paddingLeft: 20,
          color: "#222",
        }}
        value={value}
        selectionColor="#29ABE2"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default IOTTextInput;
