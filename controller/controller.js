const axios = require('axios');

const path = 'http://192.168.1.5:3002';

const controlAlarm = (_id, _isOn) => {
    console.log(_id, _isOn)
    axios.put(path + '/controlAlarm', {
        id: _id,
        isOn: _isOn
    }).then((response) => {
        console.log(response.data)
    });
}

const controlDoor = (_doorID, _isLocked, _isOpen) => {
    axios.put(path + '/controlDoor', {
        id: _doorID,
        isLocked: _isLocked,
        isOpen: _isOpen
    }).then((response) => {
        console.log(response.data);
    });
}

const controlCurtain = (_id, _action) => {
    axios.put(path + '/controlCurtain', {
        id: _id,
        action: _action
    }).then((response) => {
        console.log(response.data);
    });
}

const controlLED = (_id, _isOn, _isAuto, _brightness) => {
    axios.put(path + '/controlLED', {
        id: _id,
        isOn: _isOn,
        isAuto: _isAuto,
        brightness: _brightness
    }).then((response) => {
        console.log(response.data);
    });
}

const controlAC = (_id, _isOn, _temp) => {
    axios.put(path + '/controlAC', {
        id: _id,
        isOn: _isOn,
        temp: _temp
    }).then((response) => {
        console.log(response.data);
    });
}

const addDevice = (_code, _name) => {
    const mes = "";
    axios.post(path + '/addDevice', {
        code: _code,
        dName: _name
    }).then((response) => {
        console.log(response.data);
    });
}

export { controlDoor, controlAlarm, controlCurtain, controlLED, controlAC, addDevice }
