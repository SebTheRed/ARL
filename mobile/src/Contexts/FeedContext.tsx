import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, orderBy, startAt, endAt, collection, limit,startAfter } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
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
  const { uid }:any = useUID();
  const [currentFeed, setCurrentFeed] = useState<any>([]);
  const [lastVisible, setLastVisible] = useState(null);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData();
  }, [uid]);

  const refreshFeed = () => {
    setLastVisible(null);
    setCurrentFeed([])
    fetchData();
  };
  const paginateFeed = () => {
    fetchData()
  }

  const fetchData = async (refresh = false) => {

    let feedQuery = query(
      collection(db, "posts"),
      orderBy("timeStamp", "desc"),  // Change to descending order
      limit(PAGE_SIZE)
    );
  
    if (lastVisible) {
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),  // Change to descending order
        startAfter(lastVisible),  // Use startAfter for pagination
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(feedQuery);
    const newDocs = snapshot.docs.map(doc => doc.data());

    if (newDocs.length > 0) {
      setLastVisible(newDocs[newDocs.length - 1].timeStamp);
      setCurrentFeed((prevFeed:any) => [...prevFeed, ...newDocs]);
    }
  };

  return (
    <FeedContextProvider.Provider value={{ currentFeed, refreshFeed, paginateFeed }}>
      {children}
    </FeedContextProvider.Provider>
  );
};