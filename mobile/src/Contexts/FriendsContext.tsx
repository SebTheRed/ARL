import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { getDocs, query, collection, where } from "firebase/firestore";
import { useUID } from './UIDContext';

export const FriendsContext = createContext([]);

export const useFriends = () => {
  return useContext(FriendsContext);
};

export const FriendsProvider = ({ children }:any) => {
    const [friendUIDs, setFriendUIDs] = useState<any>([]);
    const [friendsRefresh,setFriendsRefresh] = useState(false)
    const { uid }:any = useUID();
  
    useEffect(() => {
        if (uid) {
            const fetchFriendUIDs = async () => {
                // Query where the user is the requestingUser
                const requestingQuery = query(
                  collection(db, "friendships"),
                  where("requestingUser", "==", uid),
                  where("blocked", "==", false),
                  where("pending", "==", false)
                );
          
                // Query where the user is the receivingUser
                const receivingQuery = query(
                  collection(db, "friendships"),
                  where("receivingUser", "==", uid),
                  where("blocked", "==", false),
                  where("pending", "==", false)
                );
          
                // Execute both queries
                const [requestingSnapshot, receivingSnapshot] = await Promise.all([
                  getDocs(requestingQuery),
                  getDocs(receivingQuery)
                ]);
          
                // Extract the UIDs
                const requestingUIDs = requestingSnapshot.docs.map(doc => doc.data().receivingUser);
                const receivingUIDs = receivingSnapshot.docs.map(doc => doc.data().requestingUser);
          
                // Merge and deduplicate the UIDs
                const allFriendUIDs = Array.from(new Set([...requestingUIDs, ...receivingUIDs]));
                console.log("FRANDS")
                console.log(allFriendUIDs)
                setFriendUIDs(allFriendUIDs);
              };
      
          fetchFriendUIDs();
        }
    }, [uid, friendsRefresh]);
  
    return (
      <FriendsContext.Provider value={friendUIDs}>
        {children}
      </FriendsContext.Provider>
    );
  };