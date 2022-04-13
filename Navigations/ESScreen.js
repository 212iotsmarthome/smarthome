import React from "react";
import { ScrollView, View } from "react-native";
import ESButton from "./Elements/ESButton";
import NoDeviceFoundGray from "./Elements/NoDeviceFoundGray";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";


export default function ESScreen({ navigation }) {
  const [isConnected, setIsConnected] = React.useState(true);
  const { selectName, selectDevice, setCurSelection } = React.useContext(AppContext);

  const getType = (type) => {
    if(type === 3) return "LDR";
    if(type === 4) return "DHT11";
    else return "Gas";
  }

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
          {selectName.map((ES) => (
            <ESButton
              type={getType(ES.type)}
              name={ES.name}
              key={ES.ID}
              onMainPress={() => {
                setCurSelection(ES.ID);
                navigation.navigate("ESAdjustScreen", ES);
              }}
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

      <ESDiv length={selectName.length} />
    </ScrollView>
  );
}
