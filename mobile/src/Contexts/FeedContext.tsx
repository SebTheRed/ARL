import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, orderBy, startAt, endAt, collection, limit } from "firebase/firestore"; // Import onSnapshot
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

export const FeedProvider = ({ children }:any) => {
  const { uid }:any = useUID();
  const [currentFeed, setCurrentFeed] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData();
  }, [uid]);

  const refreshFeed = () => {
    setLastVisible(null);
    fetchData(true);
  };

  const fetchData = async (refresh = false) => {
    let feedQuery = query(
      collection(db, "posts"),
      orderBy("timeStamp"),
      startAt(lastVisible || ""),
      endAt(lastVisible ? `${lastVisible}\uf8ff` : "\uf8ff"),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(feedQuery);
    const newDocs = snapshot.docs.map(doc => doc.data());

    if (newDocs.length > 0) {
      setLastVisible(newDocs[newDocs.length - 1].timestamp);
      setCurrentFeed(refresh ? newDocs : [...currentFeed, ...newDocs]);
    }
  };

  return (
    <FeedContextProvider.Provider value={{ currentFeed, refreshFeed }}>
      {children}
    </FeedContextProvider.Provider>
  );
};