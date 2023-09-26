import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter,doc,getDoc } from "firebase/firestore"; // Import onSnapshot
import { useUID } from './UIDContext';
import { db } from '../Firebase/firebase';
import { useUserData } from './UserDataContext';

const ProfilePageUIDContext = createContext({});
export const useProfilePageUID = () => {
    return useContext(ProfilePageUIDContext)
}

export const ProfilePageUIDProvider = ({children}:any) => {
    const {uid}: any = useUID();
    const {userData}:any = useUserData()
    const [profilePageUID,setProfilePageUID] = useState("")
    const [profileFeed, setProfileFeed] = useState<any>()
    const [matchingProfileData,setMatchingProfileData] = useState<any>({
        userName:String,
        accountCreationDate:String,
        friends:[],
        name:String,
        picURL:String,
        streak:Number,
        trophyPins:[],
        xpData:Object,
    })
    useEffect(()=>{
        //IDK IF I NEED THIS EFFECT
    },[])
    const refreshProfileFeed = () => {

    }

    const matchUIDtoPosts = async() => {
        findPageUserID(profilePageUID)
    }

    const findPageUserID = async(chosenUID:string) => {
        setProfilePageUID(chosenUID)
        try {
            if (uid == chosenUID) {
                setMatchingProfileData(userData)
                let feedQuery = query(
                    collection(db, "posts"),
                    where("posterUID","==",chosenUID),
                    orderBy("timeStamp", "desc"),
                  ); 
                const snapshot = await getDocs(feedQuery);
                let newDocs = snapshot.docs.map(doc => doc.data());


                const currentTime = new Date();
                const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
                newDocs = newDocs.filter((doc: any) => {
                  const postDate = doc.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
                  return postDate >= oneDayAgo;
                });


                // console.log("profile posts: ", newDocs)
                setProfileFeed(newDocs)
                
            } else {
                try{
                    const userDocRef = doc(db,"users",chosenUID);
                    const userDocSnap = await getDoc(userDocRef)
                    if (userDocSnap.exists()) {
                        const userDocData = userDocSnap.data();
                        // console.log("Document data:", userDocData);
                        setMatchingProfileData(userDocData);
                        let feedQuery = query(
                            collection(db, "posts"),
                            where("posterUID","==",chosenUID),
                            orderBy("timeStamp", "desc"),
                          ); 
                        const snapshot = await getDocs(feedQuery);
                        let newDocs = snapshot.docs.map(doc => doc.data());
                        // console.log("profile posts: ", newDocs)


                        const currentTime = new Date();
                        const oneDayAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
                        newDocs = newDocs.filter((doc: any) => {
                            const [year, month, day, hour, minute, second] = doc.timeStamp.split('-').map(Number);
                            const postDate = new Date(year, month - 1, day, hour, minute, second);
                            return postDate >= oneDayAgo;
                          });


                        setProfileFeed(newDocs)
                    } else {
                        console.log("No such document!");
                        // Handle the case where the document doesn't exist
                    }
                }catch(error){
                    console.error("error getting doc", error)
                }
                
            }
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <ProfilePageUIDContext.Provider value={{matchingProfileData,setProfilePageUID,setMatchingProfileData,profilePageUID, findPageUserID,profileFeed,refreshProfileFeed}}>
            {children}
        </ProfilePageUIDContext.Provider>
    )

}

