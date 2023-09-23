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
    
            for (let category in experiencesList) {
                for (let experienceTitle in experiencesList[category]) {
                    const q = query(
                        collection(db, `users/${uid}/xpLog`),
                        where('eventTitle', '==', experiencesList[category][experienceTitle].title),
                        orderBy('timestamp', 'desc'),
                        limit(1)
                    );
    
                    allPromises.push(getDocs(q));
                }
            }
    
            const querySnapshots = await Promise.all(allPromises);
            const calculatedCooldowns: any = {};
    
            querySnapshots.forEach((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    const type = docData.traitType;

                    const experienceCooldown = experiencesList[type][docData.eventTitle].cooldown * 60 * 60 * 1000;
                    const [year, month, day, hour, minute, second] = docData.timestamp.split("-").map(Number);
                    const lastPostedDate = new Date(year, month - 1, day, hour, minute, second);
                    const lastPostedTime = lastPostedDate.getTime();
                    const currentTime = new Date().getTime();
                    const elapsedTime = currentTime - lastPostedTime;
                    const remainingCooldown = experienceCooldown - elapsedTime;

                    if (remainingCooldown > 0) {
                        calculatedCooldowns[docData.eventTitle] = remainingCooldown / (60 * 60 * 1000);
                    }
                }
            });
    
            setCooldowns(calculatedCooldowns);
            setCooldownsLoading(false);
            console.log("calced cooldowns: ",calculatedCooldowns)
        };
    
        if (!dataLoading) {
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