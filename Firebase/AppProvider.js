import React, { useState } from "react";
import { useFirestore}  from "./useFirestore";
import { AuthContext } from "./AuthProvider";
import { db, dc } from "./firebase";
import { documentId } from "firebase/firestore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [status, setStatus] = useState(0);
  const [curSelection, setCurSelection] = useState("");
  const { user } = React.useContext(AuthContext);

  // GetID
  function getID(value, index, array) {
    return value.ID;
  }

  // Condition 1: Take devices in control
  const devCondition = React.useMemo(() => {
    return {
      fieldName: "ID",
      operator: "!=",
      compareValue: "",
    };
  }, [db]);

  // Get workspaceList from workspace with Condition 1
  const devList = useFirestore("Device", devCondition).map(getID);

  // User Control
  const control = React.useMemo(() => {
    if (user.control) {
      return user.control;
    }
    return [{ ID: "sample", name: "sample" }];
  }, [user.control]);
  const idList = control?.map(getID);

  // Condition 1: Take devices in control
  const controlCondition = React.useMemo(() => {
    return {
      fieldName: "ID",
      operator: "in",
      compareValue: idList,
    };
  }, [user, db]);

  // Condition 1.1: Take logs in all device
  const logCondition = React.useMemo(() => {
    return {
      fieldName: "deviceID",
      operator: "in",
      compareValue: idList,
    };
  }, [user, db]);

  // Get workspaceList from workspace with Condition 1
  const deviceList = useFirestore("Device", controlCondition);
  const logList = useFirestore("Log", logCondition).sort((a,b) => {
    return b.Time - a.Time;
  });

  // Get the selected Workspace
  const selectDevice = React.useMemo(
    () => deviceList.filter((item) => item.type === status),
    [user, deviceList, status]
  );

  const commentsQuery = dc.collection("Schedule");

  // Display in First Page
  const tempList = selectDevice.map(getID);
  const selectName = React.useMemo(() => {
    let temp = [];
    for (let i = 0; i < control.length; i++) {
      if (tempList.includes(control[i].ID)) {
        let result = control[i];
        result.type = selectDevice.find((x) => x.ID === control[i].ID).type;
        temp.push(result);
      }
    }
    return temp;
  }, [selectDevice]);

  /*
    1: LED,
    2: AC,
    3: LHR,
    4: DHT,
    5: Gas,
    6: Curtain,
    7: Door,
    8: Buzzer
    */
  let table = "";
  switch (status) {
    case 1:
      table = "LED";
      break;
    case 2:
      table = "AC";
      break;
    case 3:
      table = "EnviSensor";
      break;
    case 6:
      table = "SmartCurtain";
      break;
    case 7:
      table = "SmartDoor";
      break;
    default:
      table = "Device";
      break;
  }
  const selectedDeviceCondition = React.useMemo(
    () => ({
      fieldName: "ID",
      operator: "==",
      compareValue: curSelection,
    }),
    [curSelection]
  );

  // Get selectedDeviceList from type with Condition 2
  const selectedDeviceInfo = useFirestore(table, selectedDeviceCondition);

  // Get current selected Device
  const selectedDevice = React.useMemo(
    () => deviceList.find((item) => item.ID === curSelection) || [],
    [selectDevice, curSelection]
  );
  const selectedName = React.useMemo(
    () => selectName.find((item) => item.ID === curSelection),
    [selectDevice, curSelection]
  );

  const scheduleList = selectedDeviceInfo?.reduce(
    (previousValue, currentValue) =>
      previousValue.concat(currentValue.scheduleList),
    []
  );

  // Get selectedDeviceSchedule
  const selectedDeviceScheduleCondition = React.useMemo(
    () => ({
      fieldName: documentId(),
      operator: "in",
      compareValue: scheduleList,
    }),
    [selectedDeviceInfo]
  );

  // Get selectedDeviceList from type with Condition 2
  const selectedDeviceSchedule = useFirestore(
    "Schedule",
    selectedDeviceScheduleCondition
  );



  return (
    <AppContext.Provider
      value={{
        devList, // list of all devices
        status, // type of device (int)
        setStatus, // set()
        curSelection, // current device (device ID)
        setCurSelection, // set()
        deviceList, // list of user's device
        selectName, // names of devices with same status {name, ID}
        scheduleList, // list of device's schedule (scheduleID)
        logList, // log of the user
        selectedDeviceInfo, // device info (from child table (AC, LED,...))
        selectedDeviceSchedule, // schedule's info (Time, Action,...)
        selectedDevice, // device info (from Device table)
        selectedName, // name of the device chosen {name, ID}
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
