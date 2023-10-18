import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, where, orderBy, limit, query, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useGameRules } from './GameRules';
import { useUID } from './UIDContext';

const CooldownContext = createContext({});

export const useCooldowns = () => {
    return useContext(CooldownContext);
}

export const CooldownProvider = ({ children }: any) => {
    const { uid }: any = useUID();
    const { experiencesList, dataLoading }: any = useGameRules();
    const [cooldowns, setCooldowns] = useState<any>({});
    const [cooldownsLoading, setCooldownsLoading] = useState<boolean>(true);

    useEffect(() => {
        
        const fetchCooldowns = async () => {
            const allPromises: any = [];
            let querySnapshots:any
            const titleToKeyMapping: any = {};
            try {
                Object.keys(experiencesList).forEach((skill: any, i: number) => {
                    Object.keys(experiencesList[skill]).forEach((titleKey: any, i: number) => {
                      const experienceTitle = experiencesList[skill][titleKey].title;
                      titleToKeyMapping[experienceTitle] = titleKey;
                        const q = query(
                            collection(db,`users/${uid}/xpLog`),
                            where('eventTitle',"==",experiencesList[skill][titleKey].title),
                            orderBy('timeStamp','desc'),
                            limit(1)
                        )
                        allPromises.push(getDocs(q))
                    })
                })
            querySnapshots = await Promise.all(allPromises);
            } catch (err) {
                console.warn("Queries failed somehow: ",err)
            }
            
            // console.log(allPromises)
            
            const calculatedCooldowns: any = {};
            // console.log("Query Snapshots:", querySnapshots);
            // console.log("Query snapshots length: ",querySnapshots.length)
            try{
                querySnapshots.forEach((querySnapshot:any) => {
                    if (!querySnapshot.empty) {
                        const docData = querySnapshot.docs[0].data();
                        // console.log(docData)
                        const type = (docData.traitType).toLowerCase();
                        const experienceKey = titleToKeyMapping[docData.eventTitle];
                        // console.log("exp key: ",experienceKey)
                        if (experienceKey) {
                                // console.log("inside exp key")
                                // console.log(experiencesList[type][experienceKey].cooldown)
                                const experienceCooldown = experiencesList[type][experienceKey].cooldown * 60 * 60 * 1000;
                                const lastPostedDate = docData.timeStamp.toDate();
                                const lastPostedTime = lastPostedDate.getTime();
                                const currentTime = new Date().getTime();
                                const elapsedTime = currentTime - lastPostedTime;
                                const remainingCooldown = experienceCooldown - elapsedTime;
            
                                if (remainingCooldown > 0) {
                                    calculatedCooldowns[docData.eventTitle] = remainingCooldown / (60 * 60 * 1000);
                                }
                        } else {
                            console.warn("no experienceKey match",docData.eventTitle)
                        }
                        
                    }
                });
            } catch(err) {
                console.warn("document parsing failed: ", err)
            }
            
    
            setCooldowns(calculatedCooldowns);
            setCooldownsLoading(false);
            console.log("calced cooldowns: ",calculatedCooldowns)
        };
    
        if (dataLoading==false) {
            fetchCooldowns();
        }
    }, [dataLoading]);

    return (
        <CooldownContext.Provider value={{ cooldowns, cooldownsLoading }}>
            {children}
        </CooldownContext.Provider>
    );
}

export default CooldownProvider;