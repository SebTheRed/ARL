import React, {createContext,useContext,useState,useEffect} from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useUID } from './UIDContext';

const GameRules = createContext({});

export const useGameRules = () => {
    return useContext(GameRules)
}

export const GameRulesProvider = ({children}:any) => {
    const {uid}:any = useUID()
    const [experiencesList,setExperiencesList] = useState<any>({})
    const [levelScale,setLevelScale] = useState<any>({})
    const [skillsList,setSkillsList] = useState<any>({})
    const [trophyData,setTrophyData] = useState<any>({})
    const [dataLoading,setDataLoading] = useState<boolean>(true)

    useEffect(()=>{
        if (uid) {
            const initializeData = async() => {
                try {
                const expDocRef = doc(db,"gameRules","experienceList")
                const scaleDocRef = doc(db,"gameRules","levelScale")
                const skillsDocRef = doc(db,"gameRules","skillsList")
                const trophyDocRef = doc(db,"gameRules","trophyData")
    
                const expSnap = await getDoc(expDocRef)
                const scaleSnap = await getDoc(scaleDocRef)
                const skillsSnap = await getDoc(skillsDocRef)
                const trophySnap = await getDoc(trophyDocRef)
    
                setExperiencesList(expSnap.data())
                setLevelScale(scaleSnap.data())
                setSkillsList(skillsSnap.data())
                setTrophyData(trophySnap.data())
                setDataLoading(false)
                console.log("Data finished loading!")
                // console.log(expSnap.data(),scaleSnap.data(),skillsSnap.data(),trophySnap.data()) DONT TURN THIS ON LOL
                } catch(err) {
                    console.error("error loading game rule data", err)
                }
                
            }
            initializeData()
        }
        

    },[uid])





    return(
        <GameRules.Provider value={{experiencesList,levelScale,skillsList,trophyData,dataLoading,setDataLoading}}>
            {children}
        </GameRules.Provider>
    )
}