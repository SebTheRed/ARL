import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
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
    const [profileFeed, setProfileFeed] = useState()
    const [matchingProfileData,setMatchingProfileData] = useState<any>()
    useEffect(()=>{
        //IDK IF I NEED THIS EFFECT
    },[])
    const findPageUserID = async(chosenUID:string) => {
        setProfilePageUID(chosenUID)
        if (uid === chosenUID) {
            setMatchingProfileData(userData)
        } else {
            try{
                const userDocRef = doc(db,"users",chosenUID);
                const userDocSnap = await getDoc(userDocRef)
                if (userDocSnap.exists()) {
                    const userDocData = userDocSnap.data();
                    console.log("Document data:", userDocData);
                    setMatchingProfileData(userDocData);
                } else {
                    console.log("No such document!");
                    // Handle the case where the document doesn't exist
                }
            }catch(error){
                console.error("error getting doc", error)
            }
            
        }
    }

    return(
        <ProfilePageUIDContext.Provider value={{matchingProfileData,setProfilePageUID,setMatchingProfileData,profilePageUID, findPageUserID}}>
            {children}
        </ProfilePageUIDContext.Provider>
    )

}

