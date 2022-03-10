import { Text, View, TouchableOpacity } from "react-native";

const IOTButton = ({ text = "My Button", type = "dark" }) => {
  return (
    <View
      style={{
        marginVertical: 0,
        width: "60%",
        height: 65,
        alignSelf: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        style={
          type == "dark"
            ? {
                height: 50,
                width: "90%",
                backgroundColor: "#29ABE2",
                borderRadius: 25,
                shadowColor: "black",
                elevation: 5,
              }
            : type == "white"
            ? {
                height: 50,
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 25,
                shadowColor: "grey",
                elevation: 5,
              }
            : {}
        }
      >
        <Text
          style={
            type == "dark"
              ? {
                  marginTop: "auto",
                  marginBottom: "auto",
                  alignSelf: "center",
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                }
              : type == "white"
              ? {
                  marginTop: "auto",
                  marginBottom: "auto",
                  alignSelf: "center",
                  fontSize: 18,
                  color: "#29ABE2",
                  fontWeight: "bold",
                }
              : {}
          }
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default IOTButton;