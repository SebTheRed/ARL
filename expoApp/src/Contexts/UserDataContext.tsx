import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot,query,collection } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
import { db } from '../Firebase/firebase';

const UserDataContext = createContext({});

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: any) => {
  const { uid }: any = useUID(); 
  const [userData, setUserData] = useState({});
  const [userLevels, setUserLevels] = useState();
  const [userTrophies, setUserTrophies] = useState();


  // useEffect(() => {
  //   if (uid) {
  //     const userDocRef = doc(db, "users", uid);

  //     // Attach a listener to the document
  //     const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
  //       if (docSnapshot.exists()) {
  //         let dataToSet:any
  //         const userData = docSnapshot.data()
  //         dataToSet = {...userData}
  //         const requestingQuery = query(
  //           collection(db, `users/${uid}/trophyLog`),
  //         );
  //         setUserData(userData);
  //       } else {
  //         console.error("No such document!");
  //       }
  //     });

  //     // Cleanup: Unsubscribe to the listener when the component unmounts
  //     return () => unsubscribe();
  //   }

  // }, [uid]);



  return (
    <UserDataContext.Provider value={{ userTrophies, userLevels, userData, setUserTrophies, setUserLevels, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};