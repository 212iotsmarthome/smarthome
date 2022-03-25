import { Text, View, TouchableOpacity, Alert } from "react-native";

const DeleteButton = ({
    text = "My Button",
    type = "dark",
    onPress = () =>
        Alert.alert("Not assigned yet", "In development", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]),
}) => {
    return (
        <View
            style={{
                marginVertical: 0,
                alignSelf: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "absolute",
                top: 48,
                right: 40,
            }}
        >
            <TouchableOpacity
                style={
                    type == "dark"
                        ? {
                            height: 40,
                            margin: 10,
                            width: "95%",
                            backgroundColor: "red",
                            borderRadius: 25,
                            shadowColor: "black",
                            elevation: 5,
                        }
                        : type == "white"
                            ? {
                                height: 50,
                                width: "95%",
                                backgroundColor: "#FFF",
                                borderRadius: 25,
                                shadowColor: "grey",
                                elevation: 5,
                            }
                            : {}
                }
                onPress={onPress}
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
                                margin: 10
                            }
                            : type == "white"
                                ? {
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    alignSelf: "center",
                                    fontSize: 18,
                                    color: "red",
                                    fontWeight: "bold",
                                    margin: 10
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

export default DeleteButton;
