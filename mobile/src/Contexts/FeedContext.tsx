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
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  // const [lastVisible, setLastVisible] = useState(null);
  
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData(null);
  }, [uid]);

  const refreshFeed = async() => {
    setHasMore(true)
    setCurrentFeed([]);
    console.log('REFRESH')
    fetchData(null)
  };
  const paginateFeed = (startAfter:any) => {
    fetchData(startAfter)
  }

  const fetchData = async (lastVisible:any,refresh = false) => {
    console.log(lastVisible)
    if (!hasMore) return;
    let feedQuery = null
    setIsFetching(true)
    if (lastVisible) {
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),  // Change to descending order
        startAfter(lastVisible.timeStamp),  // Use startAfter for pagination
        limit(PAGE_SIZE)
      );
    } else {
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),  // Change to descending order
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(feedQuery);
    const newDocs = snapshot.docs.map(doc => doc.data());

    if (newDocs.length > 0) {
      lastVisible = newDocs[newDocs.length - 1];
      setCurrentFeed((prevFeed:any) => [...prevFeed, ...newDocs]);
    } else {
      setHasMore(false)
    }
    setIsFetching(false)
  };

  return (
    <FeedContextProvider.Provider value={{ currentFeed, refreshFeed, paginateFeed }}>
      {children}
    </FeedContextProvider.Provider>
  );
};