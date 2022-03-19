import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from './firebase';

export default function useFirebase(collectionParam, condition) {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, collectionParam);
    if (!condition) {
      if (!condition.compareValue || condition.compareValue.length)
        setDocument([]);
      return;
    }
    var q = [];
    try {
      q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
    } catch (error) {
      setDocument([]);
      return;
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach(doc => {
        documents.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setDocument(documents);
    });
    return unsubscribe;
  }, [collectionParam, condition, db])
  return document;
}

