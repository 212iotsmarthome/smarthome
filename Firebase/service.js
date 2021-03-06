import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getDocument = async (collectionParam, id) => {
  try {
    const docRef = await doc(db, collectionParam, id);
    console.log("Document getting with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export const addDocument = async (collectionParam, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionParam), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteDocumentById = async (collectionParam, id) => {
  try {
    return await deleteDoc(doc(db, collectionParam, id));
  } catch (e) {
    console.error("Error delete: ", e);
  }
};

export const editDocumentById = async (collectionParam, id, data) => {
  try {
    await updateDoc(doc(db, collectionParam, id), data);
    console.log("Update doc: ", id);
  } catch (e) {
    console.error("Error update: ", e);
  }
};
