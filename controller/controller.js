const axios = require("axios");
import { serverTimestamp } from "firebase/firestore";
import { addLog } from "../Firebase/AUD";
const path = "http://192.168.1.7:3003";

// const controlAlarm = (_id, _boardId, _value) => {
//   axios
//     .put(path + "/controlAlarm", {
//       id: _id,
//       boardId: _boardId,
//       value: _value,
//     })
//     .then((response) => {
//       console.log(response.data);
//     });
// };

// Method PUT: Put data to Nodejs
const controlLED = (
  _userName,
  _userID,
  _id,
  _name,
  _index,
  _boardID,
  _value
) => {
  const createLog = () => {
    let log = "";
    if (_value == 0) {
      log = `User ${_userName} has turned off this LED`;
      return log;
    }
    if (_value == 1) {
      log = `User ${_userName} has set this LED with low brightness`;
      return log;
    }
    if (_value == 2) {
      log = `User ${_userName} has set this LED with medium brightness`;
      return log;
    }
    if (_value == 3) {
      log = `User ${_userName} has set this LED with high brightness`;
      return log;
    }
    return "";
  };

  axios
    .put(path + "/controlLED", {
      id: _index,
      boardId: _boardID,
      value: _value,
    })
    .then((response) => {
      console.log(response.data);
      addLog({
        content: createLog(),
        deviceID: _id,
      });
    });
};

const controlAC = (
  _userName,
  _userID,
  _id,
  _name,
  _index,
  _boardID,
  _isOn,
  _temp
) => {
  const createLog = () => {
    let log = "";
    if (_isOn == false) {
      log = `User ${_userName} has turned off this Air Conditioner`;
    } else {
      log = `User ${_userName} has turned on this Air Conditioner at ${_temp}°C`;
    }
    return log;
  };

  axios
    .put(path + "/controlAC", {
      id: _index,
      boardId: _boardID,
      power: _isOn,
      temp: _temp,
    })
    .then((response) => {
      console.log(response.data);
      addLog({
        content: createLog(),
        deviceID: _id,
      });
    });
};

const controlDoor = (
  _userName,
  _userID,
  _id,
  _name,
  _index,
  _boardID,
  _isLocked,
  _isOpen
) => {
  const createLog = () => {
    let log = "";
    if (_isOpen == true) {
      log = `User ${_userName} has open this Door`;
    } else {
      if (_isLocked == true) {
        log = `User ${_userName} has locked this Door`;
      } else {
        log = `User ${_userName} has closed this Door`;
      }
    }
    return log;
  };

  axios
    .put(path + "/controlDoor", {
      id: _index,
      boardId: _boardID,
      isLocked: _isLocked,
      isOpen: _isOpen,
    })
    .then((response) => {
      console.log(response.data);
      addLog({
        content: createLog(),
        deviceID: _id,
      });
    });
};

const controlCurtain = (
  _userName,
  _userID,
  _id,
  _name,
  _index,
  _boardID,
  _action
) => {
  const createLog = () => {
    let log = "";
    if (_action == 0) {
      log = `User ${_userName} has closed this Curtain`;
    }
    if (_action == 1) {
      log = `User ${_userName} has half-opened this Curtain`;
    }
    if (_action == 2) {
      log = `User ${_userName} has full-opened this Curtain`;
    }
    return log;
  };

  axios
    .put(path + "/controlCurtain", {
      id: _index,
      boardId: _boardID,
      action: _action,
    })
    .then((response) => {
      console.log(response.data);
      addLog({
        content: createLog(),
        deviceID: _id,
      });
    });
};

const addDevice = (_code, _name) => {
  axios
    .post(path + "/addDevice", {
      code: _code,
      dName: _name,
    })
    .then((response) => {
      console.log(response.data);
    });
};

// Method GET: Get data from Nodejs
const getEnviData = async (_boardID, _Dindex, _Lindex, _Gindex) => {
  console.log(_Dindex, _Lindex, _Gindex);
  let payload = {
    boardID: _boardID,
    Dindex: _Dindex,
    Lindex: _Lindex,
    Gindex: _Gindex,
  };
  const res = await axios
    .get(path + "/getEnviStatus", {
      params: payload,
    })
    .then((response) => response.data.value);
  return res;
};

const getLEDStatus = async (_boardID, _index) => {
  const brighat = await axios
    .get(path + "/getLED", {
      params: {
        boardID: _boardID,
        index: _index,
      },
    })
    .then((response) => response.data.value);
  return brighat;
};

const getACStatus = async (_boardID, _index) => {
  const status = await axios
    .get(path + "/getAC", {
      params: {
        boardID: _boardID,
        index: _index,
      },
    })
    .then((response) => response.data.value);
  return status;
};

const getDoorStatus = async (_boardID, _index) => {
  const status = await axios
    .get(path + "/getDoor", {
      params: {
        boardID: _boardID,
        index: _index,
      },
    })
    .then((response) => response.data.value);
  return status;
};

const getCurtainStatus = async (_boardID, _index) => {
  const status = await axios
    .get(path + "/getCurtain", {
      params: {
        boardID: _boardID,
        index: _index,
      },
    })
    .then((response) => response.data.value);
  return status;
};

export {
  controlDoor,
  controlCurtain,
  controlLED,
  controlAC,
  addDevice,
  getLEDStatus,
  getACStatus,
  getDoorStatus,
  getCurtainStatus,
  getEnviData,
};
