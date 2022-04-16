import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Icon } from "react-native-elements";
import { DataTable } from "react-native-paper";
import IOTButton from "./Elements/IOTButton";
import TopHeadTypo from "./Elements/TopHeadTypo";
import { AppContext } from "../Firebase/AppProvider";
import { addSchedule, removeSchedule } from "../Firebase/AUD";
import { getDocument } from "../Firebase/service";

// import { AuthContext } from "../Firebase/AuthProvider";
// import { AppContext } from "../Firebase/AppProvider";
// import { auth } from "../Firebase/firebase";

export default function SetTimeScreen({ navigation, route }) {
  const {
    status,
    selectedName,
    selectedDevice,
    selectedDeviceInfo,
    scheduleList,
    selectedDeviceSchedule,
  } = React.useContext(AppContext);
  const Devicejson = { type: status, name: selectedName.name };
  // const ScheduleList = [
  //   {
  //     Action: "Full-open",
  //     Daily: true,
  //     ScheduleID: "1212",
  //     Time: new Date("March 16, 2022 03:24:00"),
  //   },
  //   {
  //     Action: "Close",
  //     Daily: true,
  //     ScheduleID: "1212",
  //     Time: new Date("March 16, 2022 21:50:00"),
  //   },

  // ];

  const actList =
    Devicejson.type == 1 // LED
      ? ["Light off", "Low brightness", "Medium brightness", "High brightness"]
      : Devicejson.type == 2 // AC
      ? ["AC off", "AC on"]
      : Devicejson.type == 7 /// Door
      ? ["Open door", "Close door", "Unlock door", "Lock door"]
      : Devicejson.type == 6 // Curtain
      ? ["Close", "Half-open", "Full-open"]
      : ["Alarm stand-by", "Alarm off"];

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const [isShow, setShow] = React.useState(false);

  const [ScheduleList, setScheduleList] = React.useState(
    selectedDeviceInfo[0].scheduleList
  );
  const [date, setDate] = React.useState(new Date());
  const [selectedAction, setSelectedAction] = React.useState(0);
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    // const sched = getDocument("Schedule", schedID).then(() => {
    // });
  });

  return (
    <View>
      <ScrollView
        style={{ height: "100%", backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginVertical: "10%" }}>
          <TopHeadTypo
            smalltext={
              "Set Time - " +
              (Devicejson.type == 1
                ? "LED"
                : Devicejson.type == 2
                ? "Air Conditioner"
                : Devicejson.type == 7
                ? "Smart Door"
                : Devicejson.type == 6
                ? "Auto Curtain"
                : "EnviSensor™")
            }
            largetext={Devicejson.name}
          />
        </View>

        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "3%",
            marginBottom: "8%",
            height: "15%",
            width: "40%",
            resizeMode: "contain",
          }}
          source={require("../assets/calendar.png")}
        />

        <View
          style={{
            flexDirection: "row",
            paddingLeft: "10%",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: "25%" }}>Time: </Text>

          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#29ABE2",
                fontWeight: "bold",
              }}
            >
              {(date.getHours() < 10
                ? "0" + date.getHours()
                : date.getHours()) +
                ":" +
                (date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes()) +
                "  "}
              {<Icon type="feather" name="edit-2" color="#29ABE2" size={18} />}
            </Text>
          </TouchableOpacity>

          {isShow && (
            <DateTimePicker
              value={date}
              is24Hour={true}
              mode={"time"}
              display="spinner"
              onChange={(event, selectedDate) => {
                setShow(false);
                const currentDate = selectedDate || date;
                // currentDate.setTime(currentDate.getTime() + 7 * 60 * 60 * 1000);
                setDate(currentDate);
              }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingLeft: "10%",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>Select action:</Text>

          <Picker
            mode="dropdown"
            selectedValue={selectedAction}
            style={{
              height: 50,
              width: 200,
              marginLeft: 20,
            }}
            onValueChange={(itemValue, itemPosition) =>
              setSelectedAction(itemValue)
            }
          >
            {actList.map((act, index) => {
              return (
                <Picker.Item label={act + "  "} value={index} key={index} />
              );
            })}
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingLeft: "10%",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <BouncyCheckbox
            size={25}
            fillColor="#29ABE2"
            unfillColor="#FFFFFF"
            text="Repeat daily"
            iconStyle={{ borderColor: "#29ABE2" }}
            textStyle={{
              fontSize: 18,
              color: "black",
              textDecorationLine: "none",
            }}
            onPress={() => setToggleCheckBox(!toggleCheckBox)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            height: 0.75,
            width: "86%",
            alignSelf: "center",
            backgroundColor: "#ddd",
            marginTop: 30,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: 30,
            marginTop: 0,
          }}
        >
          <DataTable style={{ marginBottom: 250 }}>
            <DataTable.Header>
              <DataTable.Title>
                <Text>Time</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text>Action</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text>{"   "}Daily</Text>
              </DataTable.Title>
            </DataTable.Header>

            {selectedDeviceSchedule.map((sched, index) => {
              // const sched = getDocument("Schedule", schedID).then((res) =>
              //   console.log(sched)
              // const sched = getDocument("Schedule", schedID).then(() =>
              // console.log(sched)
              //   {}
              // );
              // console.log(sched);
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    {String(sched.Time.toDate().getHours()).padStart(2, "0") +
                      ":" +
                      String(sched.Time.toDate().getMinutes()).padStart(2, "0")}
                  </DataTable.Cell>
                  <DataTable.Cell>{sched.Action}</DataTable.Cell>
                  <DataTable.Cell>
                    <Text>
                      {sched.Daily == true
                        ? "  Yes    "
                        : "  No     "}
                    </Text>

                    <Icon
                      type="material"
                      name="delete"
                      size={18}
                      color="#c00"
                      onPress={() => {
                        removeSchedule({
                          scheduleid: sched.id,
                          status: status,
                          scheduleList: scheduleList, // child device table
                          DeviceID: selectedDeviceInfo[0].id,
                        });
                      }}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
      </ScrollView>

      <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
        {/* <IOTButton text="Add" onPress={() => navigation.goBack()} /> */}
        <IOTButton
          text="Add"
          onPress={() => {
            addSchedule({
              status: status,
              uid: selectedDeviceInfo[0].id,
              Action: actList[selectedAction],
              Daily: toggleCheckBox,
              Time: date,
              DeviceID: selectedName.ID,
              scheduleList: scheduleList,
            });

            // console.log({
            //   status: status,
            //   uid: selectedDeviceInfo[0].id,
            //   Action: selectedAction,
            //   Daily: toggleCheckBox,
            //   Time: date,
            //   DeviceID: selectedName.ID,
            // });
          }}
        />
      </View>
    </View>
  );
}
