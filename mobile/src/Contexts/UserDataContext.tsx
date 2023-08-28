import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
import { db } from '../Firebase/firebase';

const UserDataContext = createContext({});

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: any) => {
  const { uid }: any = useUID(); // Assuming you have a UID context
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      
      // Attach a listener to the document
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        } else {
          console.error("No such document!");
        }
      });

      // Cleanup: Unsubscribe to the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};