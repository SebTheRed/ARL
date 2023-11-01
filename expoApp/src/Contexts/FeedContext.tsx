import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
import { useProfilePageUID } from './ProfilePageUID';
import { db } from '../Firebase/firebase';
import { useFriends } from './FriendsContext';
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
  const {trueFriends, blockedPersons}:any = useFriends()
  const {profilePageUID}:any = useProfilePageUID()
  const { uid }:any = useUID();
  const [globalFeed, setGlobalFeed] = useState<any>([]);
  const [friendsFeed,setFriendsFeed] = useState<any>([]);
  const [lastVisibleGloabl, setLastVisibleGlobal] = useState<any>(null);
  const [lastVisibleFriends,setLastVisibleFriends] = useState<any>(null)


  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchDataFresh();
  }, [uid,profilePageUID]);



  const feedButtonHandler = () => {
    console.log('REFRESH')
    fetchDataFresh()
    friendFetchData()
    
  }
  const newPostHandler = () => {
    console.log('REFRESH')
    fetchDataFresh()
    friendFetchData()
  }
  const refreshFeed = () => {
    console.log('REFRESH')
    fetchDataFresh()
    friendFetchData()
  };
  const paginateFeed = (startAfter:any) => {
    console.log('PAGINATE')
    fetchDataPaginate()
    // setLastVisible(startAfter)
  }
  const paginateFriends = () => {
    friendPaginateData()
  }
  const fetchDataPaginate = async () => {
    let feedQuery;
    feedQuery = query(
      collection(db, "posts"),
      orderBy("timeStamp", "desc"),
      where("globalPost", "==", true),
      startAfter(lastVisibleGloabl),
      limit(PAGE_SIZE)
    );
    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago

    newDocs = newDocs.filter((doc: any) => {
      const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return postDate >= oneDayAgo;
    }).filter((doc: any) => {
      // Also ensure the current user has not blocked the poster
      return doc.posterUID ? !blockedPersons.includes(doc.posterUID) : true; // if posterUID doesn't exist, consider it as a safe post
    });
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisibleGlobal(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      // const uniqueDocs = newDocs.filter(
      //   (doc, index, self) =>
      //     index === self.findIndex((t) => t.id === doc.id)
      // );
      console.log(newDocs.length)
      globalFeed.map((doc:any,index:number)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setGlobalFeed((prevFeed: any) => {
        const updatedFeed = [...prevFeed, ...newDocs];
        return updatedFeed.sort((a, b) => b.timeStamp.toMillis() - a.timeStamp.toMillis());
      });
      
    }
  }
  const fetchDataFresh = async () => {
    console.log("blocked personas:  ",blockedPersons)
    let feedQuery;
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),
        where("globalPost", "==", true),
        limit(PAGE_SIZE)
      );

    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
  
    newDocs = newDocs.filter((doc: any) => {
      const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return postDate >= oneDayAgo;
    }).filter((doc: any) => {
      // Also ensure the current user has not blocked the poster
      return doc.posterUID ? !blockedPersons.includes(doc.posterUID) : true; // if posterUID doesn't exist, consider it as a safe post
    });
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisibleGlobal(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      globalFeed.map((doc:any,index:number)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setGlobalFeed((prevFeed: any) => {
        const updatedFeed = [...prevFeed, ...newDocs];
        return updatedFeed.sort((a, b) => b.timeStamp.toMillis() - a.timeStamp.toMillis());
      });
      
    }
  };
  const friendFetchData = async () => {
    if (trueFriends.length > 0) {
      let feedQuery;
      feedQuery = query(
        collection(db, "posts"),
        orderBy("timeStamp", "desc"),
        where("visibleTo", "array-contains", uid),
        where("publicPost", "==", true),
        limit(PAGE_SIZE)
      );

    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
  
    newDocs = newDocs.filter((doc: any) => {
      const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return postDate >= oneDayAgo;
    });
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisibleFriends(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      friendsFeed.map((doc:any,index:number)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setFriendsFeed((prevFeed: any) => {
        const updatedFeed = [...prevFeed, ...newDocs];
        return updatedFeed.sort((a, b) => b.timeStamp.toMillis() - a.timeStamp.toMillis());
      });
      
    }
    } else {
      setFriendsFeed([])
    }
    
  }
  const friendPaginateData = async () => {
    let feedQuery;
    feedQuery = query(
      collection(db, "posts"),
      orderBy("timeStamp", "desc"),
      where("visibleTo", "array-contains", uid),
      where("publicPost", "==", true),
      startAfter(lastVisibleFriends),
      limit(PAGE_SIZE)
    );
    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago

    newDocs = newDocs.filter((doc: any) => {
      const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return postDate >= oneDayAgo;
    });
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setLastVisibleFriends(snapshot.docs[snapshot.docs.length - 1]); // Update lastVisible
      // const uniqueDocs = newDocs.filter(
      //   (doc, index, self) =>
      //     index === self.findIndex((t) => t.id === doc.id)
      // );
      console.log(newDocs.length)
      friendsFeed.map((doc:any,index:number)=>{
        newDocs.map((post,i)=>{
          if (post.id == doc.id){
            newDocs.splice(i, 1)
          }
        })
      })
      console.log(newDocs.length)
      setFriendsFeed((prevFeed: any) => {
        const updatedFeed = [...prevFeed, ...newDocs];
        return updatedFeed.sort((a, b) => b.timeStamp.toMillis() - a.timeStamp.toMillis());
      });
      
    }
  }







  return (
    <FeedContextProvider.Provider value={{ friendsFeed,globalFeed, refreshFeed, paginateFeed,paginateFriends, newPostHandler,feedButtonHandler }}>
      {children}
    </FeedContextProvider.Provider>
  );
};