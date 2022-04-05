import React, { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";
import { controlAlarm } from "../controller/controller";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";

export default function LEDAdjustScreen({ navigation, route }) {
  const [isOn, setIsOn] = React.useState(false);
  const [temp, setTemp] = React.useState("--");
  const [humid, setHumid] = React.useState("--");
  const [brightness, setBrightness] = React.useState("--");
  const [flammable, setFlammable] = React.useState(false);
  const { control, selectedDevice, selectedDeviceInfo } = React.useContext(AppContext);
  // const [loading, setLoading] = useState(true);

  // React.useEffect(() => {
  //   setLoading(false);
  // }, [selectedDeviceInfo])

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext="EnviSensor™ Adjustment" largetext={selectedName.name} />

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "10%",
            height: "18%",
            width: "30%",
            resizeMode: "contain",
          }}
          source={require("../assets/envi-sensor.png")}
        />

        <TouchableOpacity
          style={{
            height: 120,
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
              Flammable gas alarm
            </Text>
            <Text style={{ fontSize: 12.5 }}>
              The alarm goes off when the flammable gas concentration crosses
              the threshhold, or when the temperature reaches 80°C.
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

        <TouchableOpacity
          style={{
            height: 60,
            width: "82%",
            borderRadius: 20,
            paddingLeft: 20,

            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 10,

            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={() =>
            navigation.navigate("SetTimeScreen", { obj: ES, type: "ES" })
          }
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Set time
            </Text>
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

            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 14,
                color: "black",
              }}
            >
              Sensors:
            </Text>
          </View>
        </View>

        <View
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "73%",
            marginTop: -10,
          }}
        >
          <Text>
            {"        "}Temperature:{"  "}
            {temp}°C
          </Text>
          <Text>
            {"        "}Humidity:{"  "}
            {humid}%
          </Text>
          <Text>
            {"        "}Brightness:{"  "}
            {brightness} Lux
          </Text>
          <Text>
            {"        "}Flammable gas:{"  "}
            {flammable ? "Yes" : "No"}
          </Text>
        </View>
      </View>

      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        <IOTButton
          text="Save"
          onPress={() => {
            controlAlarm(ES.id, isOn);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
