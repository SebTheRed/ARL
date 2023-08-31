import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, onSnapshot, collection } from "firebase/firestore"; // Import onSnapshot
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
    const { uid }: any = useUID(); // Assuming you have a UID context
    const [currentFeed, setCurrentFeed] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (uid) {
                const q = query(collection(db, 'posts')); // Replace 'posts' with the actual collection name
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => doc.data());
                console.log("docs",docs)
                const sortedDocs = docs.sort((a, b) => {
                    return b.timeStamp.localeCompare(a.timeStamp);
                  });
                setCurrentFeed(sortedDocs);
            }
        };

        fetchData();
    }, [uid]);

    return <FeedContextProvider.Provider value={{ currentFeed, setCurrentFeed }}>{children}</FeedContextProvider.Provider>;
  };