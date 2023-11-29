import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUID } from './UIDContext';
import { useProfilePageUID } from './ProfilePageUID';
import { useFriends } from './FriendsContext';
const FeedContextProvider = createContext({});

export const useFeed = () => {

  const context = useContext(FeedContextProvider);
  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};

export const FeedProvider = ({ children }:any) => {
  const {profilePageUID}:any = useProfilePageUID()
  const { uid }:any = useUID();
  const [isPaginating,setIsPaginating] = useState<boolean>(false)
  const [globalFeed, setGlobalFeed] = useState<any>([]);
  const [friendsFeed,setFriendsFeed] = useState<any>([]);
  const [lastVisibleGlobal, setLastVisibleGlobal] = useState<any>(null);
  const [lastVisibleGlobalTrophy,setLastVisibleGlobalTrophy] = useState<any>(null);
  const [lastVisibleFriends,setLastVisibleFriends] = useState<any>(null);
  const [lastVisibleFriendsTrophy,setLastVisibleFriendsTrophy] = useState<any>(null);

  // useEffect(() => {
  //   generateNewFeeds()
  // }, [uid,profilePageUID]);


  const generateNewFeeds = async() => {
    const friendsFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateFriendsFeed"
    const globalFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateGlobalFeed"
    const [friendsFeedResponse,globalFeedResponse] = await Promise.all([
      fetch(friendsFeedFunctionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid:uid, lastVisFriends:null,lastVisTrophy:null})
      }),
      fetch(globalFeedFunctionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid:uid, lastVisGlobal:null,lastVisTrophy:null})
      }),
    ]);
    if (friendsFeedResponse.ok) {
      const friendsFeedData = await friendsFeedResponse.json()
      setFriendsFeed(friendsFeedData.posts)
      setLastVisibleFriends(friendsFeedData.lastVisibleFriends)
      setLastVisibleFriendsTrophy(friendsFeedData.lastVisibleFriendsTrophy)
      // console.log(JSON.stringify(friendsFeedData,null,2))
    } else {console.error("Friends Feed Data not properly initialized")}

    if (globalFeedResponse.ok) {
      const globalFeedData = await globalFeedResponse.json()
      setGlobalFeed(globalFeedData.posts)
      setLastVisibleGlobal(globalFeedData.lastVisibleGlobal)
      setLastVisibleGlobalTrophy(globalFeedData.lastVisibleGlobalTrophy)
      // console.log(JSON.stringify(globalFeedData,null,2))
    } else {console.error("Global Feed Data not properly initialized")}
  }
  

  const feedButtonHandler = () => {
    // console.log('REFRESH')
    // globalFetchData()
    // friendFetchData()
    
  }
  const newPostHandler = () => {
    console.log('New Post Handler')
    generateNewFeeds()
  }
  const refreshFeed = () => {
    console.log('Refresh Feed')
    generateNewFeeds()
  };


  const paginateFeed = async() => {
    if (isPaginating) return;
    setIsPaginating(true)
    console.log('GLOBAL PAGINATE', uid, lastVisibleGlobal, lastVisibleGlobalTrophy)
      const globalFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateGlobalFeed"
      const [globalFeedResponse] = await Promise.all([
        fetch(globalFeedFunctionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid:uid, lastVisGlobal:lastVisibleGlobal,lastVisTrophy:lastVisibleGlobalTrophy})
        }),
      ]);

      if (globalFeedResponse.ok) {
        const globalFeedData = await globalFeedResponse.json()
        setGlobalFeed([...globalFeed, ...globalFeedData.posts])
        setLastVisibleGlobal(globalFeedData.lastVisibleGlobal)
        setLastVisibleGlobalTrophy(globalFeedData.lastVisibleGlobalTrophy)
        // console.log(JSON.stringify(globalFeedData,null,2))
      } else {console.error("Global Feed Data not properly initialized")}
      setIsPaginating(false)
  }
  const paginateFriends = async() => {
    if (isPaginating) return;
    setIsPaginating(true)
    console.log('FRIENDS PAGINATE',uid, lastVisibleGlobal, lastVisibleGlobalTrophy)
    const friendsFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateFriendsFeed"
    const [friendsFeedResponse] = await Promise.all([
      fetch(friendsFeedFunctionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid:uid, lastVisFriends:lastVisibleFriends,lastVisTrophy:lastVisibleFriendsTrophy})
      }),
    ]);
    if (friendsFeedResponse.ok) {
      const friendsFeedData = await friendsFeedResponse.json()
      setFriendsFeed([...friendsFeed, ...friendsFeedData.posts])
      setLastVisibleFriends(friendsFeedData.lastVisibleFriends)
      setLastVisibleFriendsTrophy(friendsFeedData.lastVisibleFriendsTrophy)
      // console.log(JSON.stringify(friendsFeedData,null,2))
    } else {console.error("Friends Feed Data not properly initialized")}
    setIsPaginating(false)
  }

  //   //GLOBAL//   //
//   const globalFetchData = async () => {
//     // Fetch 9 regular posts
//     let regularQuery = query(
//       collection(db, "posts"),
//       orderBy("timeStamp", "desc"),
//       where("globalPost", "==", true),
//       limit(PAGE_SIZE)
//     );
//     const regularSnapshot = await getDocs(regularQuery);
  
//     // Fetch 1 trophy post
//     let trophyQuery = query(
//       collection(db, "trophyPosts"),
//       orderBy("timeStamp", "desc"),
//       where("globalPost", "==", true),
//       limit(1)
//     );
//     const trophySnapshot = await getDocs(trophyQuery);
  
//     // Process and combine posts
//     let combinedDocs = [
//       ...regularSnapshot.docs.map(doc => doc.data()),
//       ...trophySnapshot.docs.map(doc => doc.data())
//     ];
  
//     // Update states
//     setGlobalFeed(combinedDocs);
//     setLastVisibleGlobal(regularSnapshot.docs.length > 0 ? regularSnapshot.docs[regularSnapshot.docs.length - 1] : null);
//     setLastVisibleGlobalTrophy(trophySnapshot.docs.length > 0 ? trophySnapshot.docs[trophySnapshot.docs.length - 1] : null);
//   };
//   const globalPaginateData = async () => {
//     // Fetch next 9 regular posts
//     let regularQuery = query(
//       collection(db, "posts"),
//       orderBy("timeStamp", "desc"),
//       where("globalPost", "==", true),
//       startAfter(lastVisibleGlobal),
//       limit(PAGE_SIZE)
//     );
//     const regularSnapshot = await getDocs(regularQuery);
  
//     // Fetch next 1 trophy post
//     let trophyQuery = query(
//       collection(db, "trophyPosts"),
//       orderBy("timeStamp", "desc"),
//       where("globalPost", "==", true),
//       startAfter(lastVisibleGlobalTrophy),
//       limit(1)
//     );
//     const trophySnapshot = await getDocs(trophyQuery);
  
//     // Process and combine posts
//     let combinedDocs = [
//       ...regularSnapshot.docs.map(doc => doc.data()),
//       ...trophySnapshot.docs.map(doc => doc.data())
//     ];
  
//     // Update states
//     setGlobalFeed([...globalFeed, ...combinedDocs]);
//     setLastVisibleGlobal(regularSnapshot.docs.length > 0 ? regularSnapshot.docs[regularSnapshot.docs.length - 1] : null);
//     setLastVisibleGlobalTrophy(trophySnapshot.docs.length > 0 ? trophySnapshot.docs[trophySnapshot.docs.length - 1] : null);
//   };

  
// //   // FRIENDS //    //
// const friendFetchData = async () => {
//   // Fetch 9 friends' posts
//   let friendsQuery = query(
//     collection(db, "posts"),
//     orderBy("timeStamp", "desc"),
//     where("visibleTo", "array-contains", uid),
//     where("publicPost", "==", true),
//     limit(PAGE_SIZE)
//   );
//   const friendsSnapshot = await getDocs(friendsQuery);

//   // Fetch 1 friends' trophy post
//   let friendsTrophyQuery = query(
//     collection(db, "trophyPosts"),
//     orderBy("timeStamp", "desc"),
//     where("visibleTo", "array-contains", uid),
//     limit(1)
//   );
//   const trophySnapshot = await getDocs(friendsTrophyQuery);

//   // Process and combine posts
//   let combinedDocs = [
//     ...friendsSnapshot.docs.map(doc => doc.data()),
//     ...trophySnapshot.docs.map(doc => doc.data())
//   ];

//   // Update states
//   setFriendsFeed(combinedDocs);
//   // console.log(JSON.stringify(combinedDocs, null, 2))
//   setLastVisibleFriends(friendsSnapshot.docs.length > 0 ? friendsSnapshot.docs[friendsSnapshot.docs.length - 1] : null);
//   setLastVisibleFriendsTrophy(trophySnapshot.docs.length > 0 ? trophySnapshot.docs[trophySnapshot.docs.length - 1] : null);
// };

// const friendPaginateData = async () => {
//   // Fetch next 9 friends' posts
//   let friendsQuery = query(
//     collection(db, "posts"),
//     orderBy("timeStamp", "desc"),
//     where("visibleTo", "array-contains", uid),
//     where("publicPost", "==", true),
//     startAfter(lastVisibleFriends),
//     limit(PAGE_SIZE)
//   );
//   const friendsSnapshot = await getDocs(friendsQuery);

//   // Fetch next 1 friends' trophy post
//   let friendsTrophyQuery = query(
//     collection(db, "trophyPosts"),
//     orderBy("timeStamp", "desc"),
//     where("visibleTo", "array-contains", uid),
//     startAfter(lastVisibleFriendsTrophy),
//     limit(1)
//   );
//   const trophySnapshot = await getDocs(friendsTrophyQuery);

//   // Process and combine posts
//   let combinedDocs = [
//     ...friendsSnapshot.docs.map(doc => doc.data()),
//     ...trophySnapshot.docs.map(doc => doc.data())
//   ];

//   // Update states
//   setFriendsFeed([...friendsFeed, ...combinedDocs]);
//   setLastVisibleFriends(friendsSnapshot.docs.length > 0 ? friendsSnapshot.docs[friendsSnapshot.docs.length - 1] : null);
//   setLastVisibleFriendsTrophy(trophySnapshot.docs.length > 0 ? trophySnapshot.docs[trophySnapshot.docs.length - 1] : null);
// };






  return (
    <FeedContextProvider.Provider value={{ friendsFeed, globalFeed, setGlobalFeed, setFriendsFeed, setLastVisibleFriends, setLastVisibleFriendsTrophy, setLastVisibleGlobal, setLastVisibleGlobalTrophy, refreshFeed, paginateFeed, paginateFriends, newPostHandler,feedButtonHandler }}>
      {children}
    </FeedContextProvider.Provider>
  );
};