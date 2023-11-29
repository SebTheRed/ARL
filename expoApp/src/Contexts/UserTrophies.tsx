import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { doc,getDocs, query, collection, where, getDoc } from "firebase/firestore";
import { useUID } from './UIDContext';

const UserTrophies = createContext({})

export const useUserTrophies = () => {
  return useContext(UserTrophies)
}

export const UserTrophiesProvider = ({children}:any) => {
  const {uid}:any = useUID()
  const [userTrophies,setUserTrophies] = useState<any>([])

  // useEffect(()=>{
  //   if (uid) {
  //     const findTrophies = async() => {
  //       const requestingQuery = query(
  //         collection(db, `users/${uid}/trophyLog`),
  //       );

  //       const snapshot = await getDocs(requestingQuery)
  //       let newDocs = snapshot.docs.map(doc => doc.data());
  //       console.log("TROPHIES : : : ",newDocs)
  //       setUserTrophies(newDocs)
  //     }
  //     findTrophies();
  //   }
  // },[uid])


  return (
    <UserTrophies.Provider value={{userTrophies}}>
      {children}
    </UserTrophies.Provider>
  )


}