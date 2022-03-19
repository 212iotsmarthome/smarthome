import React, { useState } from 'react';
import useFirebase from './useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [status, setStatus] = useState(0);
    const [curSelection, setCurSelection] = useState("");
    const { user } = React.useContext(AuthContext);

    // Condition 1: Take devices in control
    const controlCondition = React.useMemo(() => {
        return {
        fieldName: "ID",
        operator: "in",
        compareValue: user.control
        }
    }, [user.control]);

    // Get workspaceList from workspace with Condition 1
    const deviceList = useFirebase("Device", controlCondition);

    // Get the selected Workspace
    let selectDevice;
    if(status != 3){
        selectDevice = React.useMemo(() => deviceList.filter(item => item.type === status) || [{}], [deviceList , status]);
    }
    else{
        selectDevice = React.useMemo(() => deviceList.filter(item => (item.type === status || item.type === status + 1 || item.type === status + 2)) || [{}], [deviceList , status]);
    }
    
    const tempList = selectDevice.map(myFunction);
    function myFunction(value, index, array) {
        return value.ID;
    }

    // Condition 2: Take all people listed in memberIDList 
    const selectDeviceCondition = React.useMemo(() => (
    {
        fieldName: "ID",
        operator: "in",
        compareValue: tempList
    }
    ), [status]);

    let table = "";
    switch(status) {
        case 1:
            table = "LED";
            break;
        case 2:
            table = "AC";
            break;
        case 3:
        case 4:
        case 5:
            table = "EnviSensor";
            break;
        case 6:
            table = "SmartCurtain";
            break;
        case 7:
            table = "SmartDoor";
            break;
        case 8:
            table = "SmartDoor";
            break;
        default:
            table = "Device";
            break;
    }

    // Get current selected Device
    const selectedDevice = React.useMemo(() => deviceList.find(item => item.ID === curSelection) || [], [selectDevice, curSelection]);

    // Get selectDeviceList from type with Condition 2
    const selectedDeviceInfo = useFirebase(table, selectDeviceCondition);

    return (
        <AppContext.Provider
        value={{
            status,
            setStatus,
            curSelection, 
            setCurSelection,
            deviceList,
            selectDevice,
            selectedDeviceInfo,
            selectedDevice,
        }}>
        {children}
        </AppContext.Provider>
    )
}