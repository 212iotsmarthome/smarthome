import React from "react";
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { controlAC, getACStatus } from "../Controller/controller";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";
import { Snackbar } from "react-native-paper";

export default function ACAdjustScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);

  const [visible, setVisible] = React.useState(Boolean(false));
  const [isOn, setIsOn] = React.useState(false);
  const [ temp, setTemp ] = React.useState("25");
  const { selectedName, selectedDevice } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  

  React.useEffect(() => {
    let isMounted = true
    getACStatus(selectedDevice.boardID, selectedDevice.index).then((data) => {
      setTemp(data.temp)
      setIsOn(data.power == 1 ? true : false)
    })
    return () => { isMounted = false };
    
  }, [])

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo
          smalltext="Air Conditioner Adjustment"
          largetext={selectedName.name}
        />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "5%",
            height: "28%",
            width: "45%",
            resizeMode: "contain",
          }}
          source={require("../assets/air-conditioner.png")}
        />

        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            backgroundColor: "#F1F9FD",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Power
            </Text>
          </View>

          <View
            style={{
              width: "30%",

              position: "absolute",
              right: "0%",
              alignItems: "center",
            }}
          >
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                height: 80,
              }}
              thumbColor={isOn ? "#29ABE2" : "#eee"}
              trackColor={{ true: "#C8E6EC", false: "#ccc" }}
              value={isOn}
              onValueChange={() => setIsOn(!isOn)}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 60,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 15,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Temperature
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "gray",
              }}
            >
              Range: 16-30°C.
            </Text>
          </View>

          <View
            style={{
              width: "30%",

              position: "absolute",
              right: "2%",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                height: 45,
                borderRadius: 10,
                borderWidth: 1,
                fontSize: 18,
                color: "#222",
                textAlign: "center",
              }}
              value={temp.toString()}
              onFocus={() => setTemp("")}
              onChangeText={(s) => {
                setTemp(parseInt(s));
              }}
              onSubmitEditing={() => {
                parseInt(temp) > 30
                  ? setTemp("30")
                  : parseInt(temp) < 16
                    ? setTemp("16")
                    : setTemp(String(parseInt(temp)));
                console.log(temp);
              }}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 70,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginVertical: 5,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={() => {
            navigation.navigate("SetTimeScreen", {
              obj: selectedName,
              type: "AC",
            });
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Set time
            </Text>
          </View>

          <View
            style={{
              width: "30%",
              position: "absolute",
              right: "0%",
              alignItems: "center",
            }}
          ></View>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        <IOTButton
          text="Save"
          onPress={() => {
            controlAC(
              user.name,
              user.ID,
              selectedName.ID,
              selectedName.name,
              selectedDevice.index, 
              selectedDevice.boardID, 
              isOn, 
              temp
            );
            console.log(
              selectedDevice.index,
              selectedDevice.boardID,
              isOn,
              temp
            );
            setVisible(true);
            // navigation.goBack();
          }}
        />
      </View>
      <Snackbar
        style={{
          borderRadius: 15,
          bottom: 20,
          width: "90%",
          alignSelf: "center",
          opacity: 0.85,
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
      //action
      >
        Change saved.
      </Snackbar>
    </View>
  );
}
