import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { doc,getDocs, query, collection, where, getDoc } from "firebase/firestore";
import { useUID } from './UIDContext';

// interface IFriendsContext {
//   trueFriends:any[],
//   pendingFriends:any[],
//   trueFriendDocs:any[],
//   pendingFriendDocs:any[],
//   setFriendsRefresh:any,
//   friendsRefresh:boolean,
// }
export const FriendsContext = createContext({});

export const useFriends = () => {
  return useContext(FriendsContext);
};

export const FriendsProvider = ({ children }:any) => {
    const [trueFriends, setTrueFriends] = useState<any>([]);
    const [blockedPersons,setBlockedPersons] = useState<any>()
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
                const trueFriendsList = allFriendData.filter(item => item.pending === false).map(item => {
                  if (item.requestingUser===uid){return item.receivingUser} else {return item.requestingUser}
                });
                const filteredPending = pendingFriends.filter(item=>item!==uid)
                // console.log("true friends", trueFriendsList)
                // console.log("pending friends", filteredPending)
                // console.log("useEffect triggered", { uid, friendsRefresh });
                if (trueFriendsList.length > 0) {
                  fetchUserDocs(trueFriendsList,"trueFriends")
                  setTrueFriends(trueFriendsList)
                } else {setTrueFriendDocs([])}
                if (filteredPending.length > 0) {fetchUserDocs(filteredPending,"pendingFriends")} else {setPendingFriendDocs([])}
              };
            const fetchBlockedUIDs = async()=>{
              const blockedQuery = query(
                collection(db, "friendships"),
                where("requestingUser","==",uid),
                where("blocked", "==", true),
              );
              const blockedQueryTWO = query(
                collection(db, "friendships"),
                where("receivingUser","==",uid),
                where("blocked", "==", true),
              )
              const [blockedSnapshotOne, blockedSnapshotTwo] = await Promise.all([
                getDocs(blockedQuery),
                getDocs(blockedQueryTWO)
              ]);
              const requestingData = blockedSnapshotOne.docs.map(doc => doc.data());
              const receivingData = blockedSnapshotTwo.docs.map(doc => doc.data());

              // Merge and deduplicate the data
              const blockedUsers = [...requestingData, ...receivingData];
              
              const blockedPersonsList = blockedUsers.filter(item => item.pending === false).map(item => {
                if (item.requestingUser===uid){return item.receivingUser} else {return item.requestingUser}
              });
              if (blockedPersonsList.length > 0 ) {
                setBlockedPersons(blockedPersonsList)
              }
            }
      
          fetchFriendUIDs();
          fetchBlockedUIDs();
          const fetchUserDocs = async(uids:string[],type:string) =>{
            const userDocs = await Promise.all(
                uids.map(async (userID) => {
                  const userDocRef = doc(db,"users",userID);
                  const userDocSnap = await getDoc(userDocRef);
                  return userDocSnap.exists() ? userDocSnap.data() : null
                })
              )
              if (type=="trueFriends"){
                // console.log("TRUE _ - _ FRIENDS: ",userDocs)
                setTrueFriendDocs(userDocs)}
              else if (type=="pendingFriends"){
                setPendingFriendDocs(userDocs)}
            }
          }
    }, [uid, friendsRefresh]);
  
    useEffect(()=>{
      
    },[trueFriends, pendingFriends])

    return (
      <FriendsContext.Provider value={{trueFriends, pendingFriends, trueFriendDocs, pendingFriendDocs,friendsRefresh, setFriendsRefresh,}}>
        {children}
      </FriendsContext.Provider>
    );
  };