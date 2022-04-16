import { ScrollView, View } from "react-native";
import React from "react";
import DeleteButton from "./Elements/DeleteButton";
import LogCard from "./Elements/LogCard";
import THTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";

const LogScreen = () => {
  const { logList, deviceList } = React.useContext(AppContext);
  // React.useEffect(() => {
  //   console.log(deviceList.find(x => x.ID == "1000005"));
  //   console.log(logList);
  // })
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: "10%", marginBottom: 20 }}>
        <THTypo smalltext="Personal" largetext="Log"></THTypo>
      </View>
      <ScrollView>
        {logList.map((log) => (
          <LogCard
            key={log.id}
            time={log.Time}
            title={deviceList.find((x) => x.ID == log.deviceID).name}
            content={log.content}
            uid={log.id}
          />
        ))}
      </ScrollView>
      <DeleteButton text="Clear Log" type="dark"></DeleteButton>
    </View>
  );
};

export default LogScreen;
