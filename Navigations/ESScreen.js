import React from "react";
import { ScrollView, View } from "react-native";
import ESButton from "./Elements/ESButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";


export default function ESScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const [ESs, setESs] = React.useState([
    {
      id: 4000001,
      type: "ES-01A",
      name: "Phòng khách",
    },
  ]);

  function ESDiv(props) {
    const length = props.length;
    if (length == 0) return <NoDeviceFoundGray />;

    return (
      <View>
        {/* <Text
          style={{ left: "70%", marginBottom: 10, color: "#aaa", fontSize: 12 }}
        >
          Lock/Unlock
        </Text> */}

        <View style={{ marginBottom: 60, width: "100%" }}>
          {ESs.map((ES) => (
            <ESButton
              type={ES.type}
              name={ES.name}
              key={ES.id}
              onMainPress={() => navigation.navigate("ESAdjustScreen", ES)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginVertical: "10%" }}>
        <TopHeadTypo smalltext={"Control Center"} largetext="EnviSensor™" />
      </View>

      <ESDiv length={ESs.length} />
    </ScrollView>
  );
}
