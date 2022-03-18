import { addDocument, deleteDocumentById,  editDocumentById } from "./service";

export const addLED = async (data) => {
    collectionParam  = "LED";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
            scheduleList: [],
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const addAC = async (data) => {
    collectionParam  = "AC";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
            scheduleList: [],
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const addSD = async (data) => {
    collectionParam  = "SmartDoor";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
            scheduleList: [],
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const addSC = async (data) => {
    collectionParam  = "SmartCurtain";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
            scheduleList: [],
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const addBuzzer = async (data) => {
    collectionParam  = "Buzzer";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const addSensor = async (data) => {
    collectionParam  = "EnviSensor";
    try {
        const temp = await addDocument("Device", {
            boardID: data.boardID,
            feedName: data.feedName,
            index: data.index,
            ID: data.ID,
            type: data.type,
            name: data.name,
        })
        const temp2 = await addDocument(collectionParam, {
            ID: data.ID,
            buzzerOn: false,
            callList: [],
        })
        return [temp, temp2];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}