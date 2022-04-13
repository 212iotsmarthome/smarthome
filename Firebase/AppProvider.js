import React, { useState } from 'react';
import useFirebase from './useFirestore';
import { AuthContext } from './AuthProvider';
import { db } from './firebase';
import { documentId } from 'firebase/firestore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [ status, setStatus ] = useState(0);
    const [ curSelection, setCurSelection ] = useState("");
    const { user } = React.useContext(AuthContext);

    // GetID
    function getID(value, index, array) { return value.ID; }

    // Condition 1: Take devices in control
    const devCondition = React.useMemo(() => {
        return {
            fieldName: "ID",
            operator: "!=",
            compareValue: ""
        }
    }, [db]);

    // Get workspaceList from workspace with Condition 1
    const devList = useFirebase("Device", devCondition).map(getID);

    // User Control
    const control = React.useMemo(() => {
        if(user.control){
            return user.control;
        }
        return [{ID: "sample", name: "sample"}];
    }, [user.control]);
    const idList = control?.map(getID);
    
    // Condition 1: Take devices in control
    const controlCondition = React.useMemo(() => {
        return {
            fieldName: "ID",
            operator: "in",
            compareValue: idList
        }
    }, [user, db]);

    // Get workspaceList from workspace with Condition 1
    const deviceList = useFirebase("Device", controlCondition);

    // Get the selected Workspace
    let selectDevice;
    if (status != 3) {
        selectDevice = React.useMemo(() => deviceList.filter(item => item.type === status) , [deviceList, status]);
    }
    else {
        selectDevice = React.useMemo(() => deviceList.filter(item => (item.type === status || item.type === status + 1 || item.type === status + 2)) || [{}], [deviceList, status]);
        console.log(control)
    }

    // Display in First Page
    const tempList = selectDevice.map(getID);
    const selectName = React.useMemo(() => {
        let temp = [];
        for(let i = 0; i < control.length; i++){
            if(tempList.includes(control[i].ID)){
                let result = control[i];
                result.type = selectDevice.find(x => x.ID === control[i].ID).type;
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

    // Get current selected Device
    const selectedDevice = React.useMemo(() => deviceList.find(item => item.ID === curSelection) || [], [selectDevice, curSelection]);
    const selectedName = React.useMemo(() => selectName.find(item => item.ID === curSelection) , [selectDevice, curSelection]);
    const selectedDeviceCondition = React.useMemo(() => ({
        fieldName: "ID",
        operator: "==",
        compareValue: curSelection
    }), [curSelection]);

    // Get selectedDeviceList from type with Condition 2
    const selectedDeviceInfo = useFirebase(table, selectedDeviceCondition);

    const scheduleList = selectedDeviceInfo?.reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue.scheduleList),
        []
    );
      
    // Get selectedDeviceSchedule
    const selectedDeviceScheduleCondition = React.useMemo(() => ({
        fieldName: documentId(),
        operator: "in",
        compareValue: scheduleList
    }), [selectedDeviceInfo]);

    // Get selectedDeviceList from type with Condition 2
    const selectedDeviceSchedule = useFirebase("Schedule", selectedDeviceScheduleCondition);

    return (
        <AppContext.Provider
            value={{
                devList,
                status,
                setStatus,
                curSelection,
                setCurSelection,
                deviceList,
                selectDevice,
                selectName,
                scheduleList,
                selectedDeviceInfo,
                selectedDeviceSchedule,
                selectedDevice,
                selectedName,
            }}>
            {children}
        </AppContext.Provider>
    )
}