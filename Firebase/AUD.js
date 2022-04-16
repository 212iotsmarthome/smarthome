import { serverTimestamp } from "firebase/firestore";
import { addDocument, deleteDocumentById, editDocumentById } from "./service";

const switchTable = (status) => {
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
  return table;
};

export const removeLog = async (uid) => {
  try {
    const temp = await deleteDocumentById("Log", uid);
    return temp;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const removeSchedule = async (data) => {
  try {
    const temp = await deleteDocumentById("Schedule", data.scheduleid);
    const temp2 = await editDocumentById(
      switchTable(data.status),
      data.DeviceID,
      {
        scheduleList: [
          ...data.scheduleList.filter((value) => value !== data.scheduleid),
        ],
      }
    );
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addLED = async (data) => {
  collectionParam = "LED";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
      scheduleList: [],
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addAC = async (data) => {
  collectionParam = "AC";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
      scheduleList: [],
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addSD = async (data) => {
  collectionParam = "SmartDoor";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
      scheduleList: [],
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addSC = async (data) => {
  collectionParam = "SmartCurtain";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
      scheduleList: [],
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addBuzzer = async (data) => {
  collectionParam = "Buzzer";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addSensor = async (data) => {
  collectionParam = "EnviSensor";
  try {
    const temp = await addDocument("Device", {
      boardID: data.boardID,
      feedName: data.feedName,
      index: data.index,
      ID: data.ID,
      type: data.type,
      name: data.name,
    });
    const temp2 = await addDocument(collectionParam, {
      ID: data.ID,
      buzzerOn: false,
      callList: [],
    });
    return [temp, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addLog = async (data) => {
  collectionParam = "Log";
  try {
    const temp = await addDocument(collectionParam, {
      content: data.content,
      deviceID: data.deviceID,
      Time: serverTimestamp(),
    });
    // const temp2 = await editDocumentById(switchTable(data.status), data.deviceID, {
    //     scheduleList: [...data.scheduleList, temp]
    // })
    return temp;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addSchedule = async (data) => {
  let collectionParam = "Schedule";
  try {
    const addedID = await addDocument(collectionParam, {
      Action: data.Action,
      Daily: data.Daily,
      Time: data.Time,
      DeviceID: data.DeviceID,
    });
    const temp2 = await editDocumentById(switchTable(data.status), data.uid, {
      scheduleList: [...data.scheduleList, addedID],
    });
    return [addedID, temp2];
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
