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
  const [lastVisible, setLastVisible] = useState<any>(null);
  
// THE PROBLEM EXISTS SOMEWHERE IN HERE! D:


  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchDataFresh();
  }, [uid,profilePageUID]);
  const feedButtonHandler = () => {
    console.log('REFRESH')
    fetchDataFresh()
  }
  const newPostHandler = () => {
    console.log('REFRESH')
    fetchDataFresh()
  }
  const refreshFeed = () => {
    console.log('REFRESH')
    fetchDataFresh()
  };
  const paginateFeed = (startAfter:any) => {
    console.log('PAGINATE')
    fetchDataPaginate()
    // setLastVisible(startAfter)
  }
  const fetchDataPaginate = async () => {
    let feedQuery;
    feedQuery = query(
      collection(db, "posts"),
      orderBy("timeStamp", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      // const uniqueDocs = newDocs.filter(
      //   (doc, index, self) =>
      //     index === self.findIndex((t) => t.id === doc.id)
      // );
      console.log(newDocs.length)
      currentFeed.map((doc,index)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setCurrentFeed((prevFeed: any) => [...prevFeed, ...newDocs]);
      
    }
  }
  const fetchDataFresh = async () => {
    let feedQuery;
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),
        limit(PAGE_SIZE)
      );

    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      currentFeed.map((doc,index)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setCurrentFeed((prevFeed: any) => [...prevFeed, ...newDocs]);
      
    }
  };

  return (
    <FeedContextProvider.Provider value={{ currentFeed, refreshFeed, paginateFeed, newPostHandler,feedButtonHandler }}>
      {children}
    </FeedContextProvider.Provider>
  );
};