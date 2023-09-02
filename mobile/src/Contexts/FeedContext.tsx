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
  let lastVisible:any = null
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData();
  }, [uid]);

  const refreshFeed = async() => {
    lastVisible = null;
    setHasMore(true)
    setCurrentFeed([]);
    console.log('REFRESH')
    fetchData()
  };
  const paginateFeed = () => {
    fetchData()
  }

  const fetchData = async (refresh = false) => {
    if (!hasMore) return;
    setIsFetching(true)
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
      lastVisible = newDocs[newDocs.length - 1].timeStamp;
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