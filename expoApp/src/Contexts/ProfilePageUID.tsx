import React, { createContext, useContext, useState } from 'react';
import { useUID } from './UIDContext';
import { useGameRules } from './GameRules';

const ProfilePageUIDContext = createContext({});
export const useProfilePageUID = () => {
    return useContext(ProfilePageUIDContext)
}

export const ProfilePageUIDProvider = ({children}:any) => {
    const {uid}:any = useUID()
    const {gameRules}:any = useGameRules()
    const [profilePageData,setProfilePageData] = useState<any>({
      loading:true,
      profileFeed:[],
    })
    const refreshProfileFeed = () => {
      setProfilePageData({
        loading:true,
        profileFeed:[]
      })
    }

    const findPageUserID = async(chosenUID:string) => {
        // let dataToUpdate:any = {}
        // dataToUpdate.profilePageUID = chosenUID
        // // setProfilePageUID(chosenUID)
        // try {
        //     if (uid == chosenUID) {
        //         dataToUpdate.matchingProfileData = userData
        //         dataToUpdate.userLevels =(calculateUserLevels(userData, gameRules.levelScale))
        //         // setMatchingProfileData(userData)
        //         let feedQuery = query(
        //             collection(db, "posts"),
        //             where("posterUID","==",chosenUID),
        //             orderBy("timeStamp", "desc"),
        //           ); 
        //         const snapshot = await getDocs(feedQuery);
        //         let newDocs = snapshot.docs.map(doc => doc.data());


        //         const currentTime = new Date();
        //         const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
        //         newDocs = newDocs.filter((doc: any) => {
        //           const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
        //           return postDate >= oneDayAgo;
        //         });
        //         // console.log("profile posts: ", newDocs)
        //         dataToUpdate.profileFeed = newDocs
                

                
        //         const requestingQuery = query(
        //           collection(db, `users/${chosenUID}/trophyLog`),
        //         );
        //         const trophySnapshot = await getDocs(requestingQuery)
        //         let trophyDocs = trophySnapshot.docs.map(doc => doc.data());
        //         trophyDocs = trophyDocs.filter(trophy => trophy.status === 'achieved');
        //         dataToUpdate.trophyList = trophyDocs
                
        //     } else {
        //         try{
        //             const userDocRef = doc(db,"users",chosenUID);
        //             const userDocSnap = await getDoc(userDocRef)
        //             if (userDocSnap.exists()) {
        //                 const userDocData = userDocSnap.data();
        //                 // console.log("Document data:", userDocData);
        //                 dataToUpdate.matchingProfileData = userDocData
        //                 dataToUpdate.userLevels =(calculateUserLevels(userDocData, gameRules.levelScale))
        //                 // setMatchingProfileData(userDocData);
        //                 let feedQuery = query(
        //                     collection(db, "posts"),
        //                     where("posterUID","==",chosenUID),
        //                     orderBy("timeStamp", "desc"),
        //                     where("publicPost", "==", true),
        //                   ); 
        //                 const snapshot = await getDocs(feedQuery);
        //                 let newDocs = snapshot.docs.map(doc => doc.data());
        //                 // console.log("profile posts: ", newDocs)


        //                 const currentTime = new Date();
        //                 const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
        //                 newDocs = newDocs.filter((doc: any) => {
        //                     const postDate = doc.timeStamp.toDate();
        //                     return postDate >= oneDayAgo;
        //                   });

        //                   dataToUpdate.profileFeed = newDocs
        //                 // setProfileFeed(newDocs)
        //                 const requestingQuery = query(
        //                   collection(db, `users/${chosenUID}/trophyLog`),
        //                 );
        //                 const trophySnapshot = await getDocs(requestingQuery)
        //                 let trophyDocs = trophySnapshot.docs.map(doc => doc.data());

        //                 trophyDocs = trophyDocs.filter(trophy => trophy.status === 'achieved');
        
        //                 dataToUpdate.trophyList = trophyDocs
        //             } else {
        //                 console.log("No such document!");
        //                 // Handle the case where the document doesn't exist
        //             }
        //         }catch(error){
        //             console.error("error getting doc", error)
        //         }
                
        //     }
        // } catch(err) {
        //     console.error(err)
        // }
        // try {
        //   const storage = getStorage();
        //   const pathRef = ref(storage, dataToUpdate.matchingProfileData.picURL);
        //   const coverPathRef = ref(storage, dataToUpdate.matchingProfileData.coverURL);
        //   const profilePicUrl = await getDownloadURL(pathRef);
        //   const coverPicUrl = await getDownloadURL(coverPathRef);
        //   dataToUpdate.profilePicUrl = profilePicUrl
        //   dataToUpdate.coverPicUrl = coverPicUrl
        // } catch(err) {
        //   console.error("error loading pictures",err)
        // }
        // dataToUpdate.loading = false
        // console.log("user levels from within context", dataToUpdate.userLevels)
        // setProfilePageData(dataToUpdate)
  try {
        
    const profilePageFuncURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/curateProfilePage"
    const [profilePageFeedResponse] = await Promise.all([
      fetch(profilePageFuncURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userUID:uid, profileUID: chosenUID , levelScale: gameRules.levelScale})
      }),
    ])
      if (profilePageFeedResponse.ok) {
        const profilePageData = await profilePageFeedResponse.json()
        profilePageData.loading = false
        // console.log("Fetched profile data", JSON.stringify(profilePageData,null,2))
        setProfilePageData(profilePageData)
      } else {console.error("Profile page data not properly initialized, please try again.")}
    } catch (err) {
      console.error("profile page data brokey :(", err)
    }
  }


    return(
        <ProfilePageUIDContext.Provider value={ {findPageUserID,refreshProfileFeed,profilePageData,setProfilePageData} }>
            {children}
        </ProfilePageUIDContext.Provider>
    )

}

// REQUIRES const {userUID, profileUID, levelScale} = request.body
// const profilePageFuncURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateFriendsFeed"
//     const [profilePageFeedResponse] = await Promise.all([
//       fetch(profilePageFuncURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({userUID:uid, profileUID: ??? , levelScale: GameRulesProvider.levelScale})
//       })
//       if (profilePageFeedResponse.ok) {
//         const profilePageData = await profilePageFeedResponse.json()
//         // SET THAT SHIT
//       } else {console.error("Profile page data not properly initialized, please try again.")}