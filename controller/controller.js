const axios = require("axios");

const path = "http://192.168.1.9:3002";

const controlAlarm = (_id, _boardId, _value) => {
  axios
    .put(path + "/controlAlarm", {
      id: _id,
      boardId: _boardId,
      value: _value,
    })
    .then((response) => {
      console.log(response.data);
    });
};

const controlDoor = (_doorID, _boardID, _isLocked, _isOpen) => {
  axios
    .put(path + "/controlDoor", {
      id: _doorID,
      boardId: _boardID,
      isLocked: _isLocked,
      isOpen: _isOpen,
    })
    .then((response) => {
      console.log(response.data);
    });
};

const controlCurtain = (_id, _boardId, _action) => {
  axios
    .put(path + "/controlCurtain", {
      id: _id,
      boardId: _boardId,
      action: _action,
    })
    .then((response) => {
      console.log(response.data);
    });
};

const controlLED = (_id, _boardId, _value) => {
  console.log(path);
  axios
    .put(path + "/controlLED", {
      id: _id,
      boardId: _boardId,
      value: _value,
    })
    .then((response) => {
      console.log(response.data);
    });
};

const controlAC = (_id, _boardId, _isOn, _temp) => {
  axios
    .put(path + "/controlAC", {
      id: _id,
      boardId: _boardId,
      power: _isOn,
      temp: _temp,
    })
    .then((response) => {
      console.log(response.data);
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

const getLEDStatus = async (_boardID, _index) => {
  const brighat = await axios.get(path + '/getLED', {
    params: {
      boardID: _boardID,
      index: _index
    },
  }).then((response) =>
    response.data.value
  )
  return brighat
}

const getACStatus = async (_boardID, _index) => {
  const status = await axios.get(path + '/getAC', {
    params: {
      boardID: _boardID,
      index: _index
    },
  }).then((response) =>
    response.data.value
  )
  return status
}

const getDoorStatus = async (_boardID, _index) => {
  const status = await axios.get(path + '/getDoor', {
    params: {
      boardID: _boardID,
      index: _index
    },
  }).then((response) =>
    response.data.value
  )
  return status
}

const getCurtainStatus = async (_boardID, _index) => {
  const status = await axios.get(path + '/getCurtain', {
    params: {
      boardID: _boardID,
      index: _index
    },
  }).then((response) =>
    response.data.value
  )
  return status
}

export {
  controlDoor,
  controlAlarm,
  controlCurtain,
  controlLED,
  controlAC,
  addDevice,
  getLEDStatus,
  getACStatus,
  getDoorStatus,
  getCurtainStatus
};
