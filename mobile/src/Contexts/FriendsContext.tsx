import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { doc,getDocs, query, collection, where, getDoc } from "firebase/firestore";
import { useUID } from './UIDContext';

interface IFriendsContext {
  trueFriends:any[],
  pendingFriends:any[],
  trueFriendDocs:any[],
  pendingFriendDocs:any[],
}

export const FriendsContext = createContext<IFriendsContext | null>(null);

export const useFriends = () => {
  return useContext(FriendsContext);
};

export const FriendsProvider = ({ children }:any) => {
    const [trueFriends, setTrueFriends] = useState<any>([]);
    const [pendingFriends,setPendingFriends] = useState<any>([])
    const [trueFriendDocs, setTrueFriendDocs] = useState<any[]>([]);
    const [pendingFriendDocs, setPendingFriendDocs] = useState<any[]>([]);
    const [friendsRefresh,setFriendsRefresh] = useState<boolean>(false)
    const { uid }:any = useUID();
  
    useEffect(() => {
        if (uid) {
            const fetchFriendUIDs = async () => {
                // Query where the user is the requestingUser
                const requestingQuery = query(
                  collection(db, "friendships"),
                  where("requestingUser", "==", uid),
                  where("blocked", "==", false),
                );
          
                // Query where the user is the receivingUser
                const receivingQuery = query(
                  collection(db, "friendships"),
                  where("receivingUser", "==", uid),
                  where("blocked", "==", false),
                );
          
                // Execute both queries
                const [requestingSnapshot, receivingSnapshot] = await Promise.all([
                  getDocs(requestingQuery),
                  getDocs(receivingQuery)
                ]);
          
                // Extract the UIDs
                const requestingData = requestingSnapshot.docs.map(doc => doc.data());
                const receivingData = receivingSnapshot.docs.map(doc => doc.data());

                // Merge and deduplicate the data
                const allFriendData = [...requestingData, ...receivingData];
                
                const pendingFriends = allFriendData.filter(item => item.pending === true).map(item => item.requestingUser);
                const trueFriends = allFriendData.filter(item => item.pending === false).map(item => {
                  if (item.requestingUser===uid){return item.receivingUser} else {return item.requestingUser}
                });
                const filteredPending = pendingFriends.filter(item=>item!==uid)
                // console.log("FRANDS")
                // console.log(allFriendUIDs)
                console.log("true friends", trueFriends)
                console.log("pending friends", filteredPending)
                
                setTrueFriends(trueFriends);
                setPendingFriends(filteredPending)
              };
      
          fetchFriendUIDs();
        }
    }, [uid, friendsRefresh]);
  
    useEffect(()=>{
      const fetchUserDocs = async(uids:string[],type:string) =>{
        const userDocs = await Promise.all(
          uids.map(async (userID) => {
            const userDocRef = doc(db,"users",userID);
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.exists() ? userDocSnap.data() : null
          })
        )
        if (type=="trueFriends"){setTrueFriendDocs(userDocs)}
        else if (type=="pendingFriends"){setPendingFriendDocs(userDocs)}
      }
      if (trueFriends.length > 0) {fetchUserDocs(trueFriends,"trueFriends")}
      if (pendingFriends.length > 0) {fetchUserDocs(pendingFriends,"pendingFriends")}
    },[trueFriends, pendingFriends])

    return (
      <FriendsContext.Provider value={{trueFriends, pendingFriends, trueFriendDocs, pendingFriendDocs}}>
        {children}
      </FriendsContext.Provider>
    );
  };