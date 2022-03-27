import React, { useState } from 'react';
import useFirebase from './useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [status, setStatus] = useState(0);
    const [curSelection, setCurSelection] = useState("");
    const [reload, setReload] = useState(true);
    const { user } = React.useContext(AuthContext);

    // GetID
    function getID(value, index, array) { return value.ID; }

    // User Control
    const control = React.useMemo(() => user.control || [], [user.control]);
    const idList = control.map(getID);
    
    const hotReload = () => {
        if(reload === true){
            setReload(false);
        }
        else{
            setReload(true);
        }
    }
    
    // Condition 1: Take devices in control
    const controlCondition = React.useMemo(() => {
        return {
            fieldName: "ID",
            operator: "in",
            compareValue: idList
        }
    }, [user.control, reload]);

    // Get workspaceList from workspace with Condition 1
    const deviceList = useFirebase("Device", controlCondition);

    // Get the selected Workspace
    let selectDevice;
    if (status != 3) {
        selectDevice = React.useMemo(() => deviceList.filter(item => item.type === status) , [deviceList, status]);
    }
    else {
        selectDevice = React.useMemo(() => deviceList.filter(item => (item.type === status || item.type === status + 1 || item.type === status + 2)) || [{}], [deviceList, status]);
    }

    // Display in First Page
    const tempList = selectDevice.map(getID);
    const selectName = React.useMemo(() => {
        let temp = [];
        for(let i = 0; i < control.length; i++){
            if(tempList.includes(control[i].ID)){
                let result = control[i];
                result.type = selectDevice.find(x => x.ID === control[i].ID).type;
                temp.push(result)
            }
        }
        return temp;
    }, [selectDevice]);

    // Condition 2: Take all people listed in memberIDList 
    const selectDeviceCondition = React.useMemo(() => ({
        fieldName: "ID",
        operator: "in",
        compareValue: tempList
    }), [status]);
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
        default:
            table = "Device";
            break;
    }

    // Get current selected Device
    const selectedDevice = React.useMemo(() => deviceList.find(item => item.ID === curSelection) || [], [selectDevice, curSelection]);
    const selectedControlDevice = React.useMemo(() => control.find(item => item.ID === curSelection) , [selectDevice, curSelection]);
    const selectedName = React.useMemo(() => selectName.find(item => item.ID === curSelection) , [selectDevice, curSelection]);

    // Get selectDeviceList from type with Condition 2
    const selectedDeviceInfo = useFirebase(table, selectDeviceCondition);

    return (
        <AppContext.Provider
            value={{
                status,
                setStatus,
                curSelection,
                control,
                setCurSelection,
                deviceList,
                selectDevice,
                selectName,
                selectedDeviceInfo,
                selectedDevice,
                selectedName,
                selectedControlDevice,
                hotReload
            }}>
            {children}
        </AppContext.Provider>
    )
}