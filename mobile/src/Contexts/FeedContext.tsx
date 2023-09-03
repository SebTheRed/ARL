import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
import { useProfilePageUID } from './ProfilePageUID';
import { db } from '../Firebase/firebase';
const FeedContextProvider = createContext({});

export const useFeed = () => {
  const context = useContext(FeedContextProvider);
  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};
type DocumentData = undefined

export const FeedProvider = ({ children }:any) => {
  const {profilePageUID}:any = useProfilePageUID()
  const { uid }:any = useUID();
  const [currentFeed, setCurrentFeed] = useState<any>([]);
  // const [lastVisible, setLastVisible] = useState(null);
  
  const PAGE_SIZE = 2;

  useEffect(() => {
    fetchData(null);
  }, [uid,profilePageUID]);
  const newPostHandler = () => {
    setCurrentFeed([]);
    console.log('REFRESH')
    fetchData(null)
  }
  const refreshFeed = async() => {
    setCurrentFeed([]);
    console.log('REFRESH')
    fetchData(null)
  };
  const paginateFeed = (startAfter:any) => {
    fetchData(startAfter)
  }

  const fetchData = async (lastVisible:any,refresh = false) => {
    let feedQuery = null
    if (lastVisible) {
      if (profilePageUID != "") {
        feedQuery = query(
          collection(db, "posts"),
          where("uid","==",profilePageUID),
          orderBy("timeStamp", "desc"),  // Change to descending order
          startAfter(lastVisible.timeStamp),  // Use startAfter for pagination
          limit(PAGE_SIZE)
        );
      } else {
        feedQuery = query(
          collection(db, "posts"),
          orderBy("timeStamp", "desc"),  // Change to descending order
          startAfter(lastVisible.timeStamp),  // Use startAfter for pagination
          limit(PAGE_SIZE)
        );
      }
      
    } else if (profilePageUID != ""){
      feedQuery = query(
        collection(db,"posts"),
        where("uid","==",profilePageUID),
        orderBy("timeStamp","desc"),
        limit(PAGE_SIZE)
      )
    } else {
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),  // Change to descending order
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(feedQuery);
    const newDocs = snapshot.docs.map(doc => doc.data());
    console.log(newDocs.length)
    if (newDocs.length > 0) {
      lastVisible = newDocs[newDocs.length - 1];
      setCurrentFeed((prevFeed:any) => [...prevFeed, ...newDocs]);
    } else {

    }
  };

  return (
    <FeedContextProvider.Provider value={{ currentFeed, refreshFeed, paginateFeed, newPostHandler }}>
      {children}
    </FeedContextProvider.Provider>
  );
};