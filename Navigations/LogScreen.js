import { ScrollView, View } from "react-native";
import React from "react";
import LogCard from "./Elements/LogCard";
import THTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";
import { AuthContext } from "../Firebase/AuthProvider";

const LogScreen = () => {
  const { logList } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    // console.log(user.control);
  }, []);

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
            title={user.control.find((x) => x.ID == log.deviceID).name}
            content={log.content}
            uid={log.id}
          />
        ))}
      </ScrollView>
      {/* <DeleteButton text="Clear Log" type="dark"></DeleteButton> */}
    </View>
  );
};

export default LogScreen;
