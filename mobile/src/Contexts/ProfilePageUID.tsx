import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
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
    const [profilePageUID,setProfilePageUID] = useState({})
    const [matchingProfileData,setMatchingProfileData] = useState()
    useEffect(()=>{
        //IDK IF I NEED THIS EFFECT
    },[])

    const findPageUserID = (chosenUID:string) => {
        if (uid === chosenUID) {
            setMatchingProfileData(userData)
        } else {
            const userDocRef = doc(db,"users",chosenUID);
            console.log(userDocRef)
            // setMatchingProfileData()
        }
    }

    return(
        <ProfilePageUIDContext.Provider value={{matchingProfileData,setProfilePageUID,profilePageUID, findPageUserID}}>
            {children}
        </ProfilePageUIDContext.Provider>
    )

}

