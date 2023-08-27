import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { useUID } from './UIDContext';
import {db} from '../Firebase/firebase'
const UserDataContext = createContext({});

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }:any) => {
  const { uid }:any = useUID(); // Assuming you have a UID context
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log("UID from context:", uid);  // Debugging line
    
  }, [uid])


  return (
    <UserDataContext.Provider value={{userData,setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};