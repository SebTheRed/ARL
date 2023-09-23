import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection,where,orderBy,limit,query,getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useGameRules } from './GameRules';
import { useUID } from './UIDContext';

const CooldownContext = createContext({});

export const useCooldowns = () => {
    return useContext(CooldownContext);
}

export const CooldownProvider = ({ children }: any) => {
    const {uid}:any = useUID();
    const {experiencesList}:any = useGameRules();
    const [cooldowns, setCooldowns] = useState<any>();
    const [cooldownsLoading, setCooldownsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCooldowns = async () => {
            const allPromises:any = [];
            // For each category, fetch the most recent log for each experience
            Object.keys(experiencesList).forEach(category => {
                console.log("Category", category);
                
                Object.keys(experiencesList[category]).forEach(experienceTitle => {
                    console.log("ExperienceTitle", experienceTitle);
                    
                    const q = query(
                        collection(db, `${uid}/xpLog`),
                        where('eventTitle', '==', experiencesList[category][experienceTitle].title),
                        orderBy('timestamp', 'desc'),
                        limit(1)
                    );
                    
                    const promise = getDocs(q).then((querySnapshot: any) => {
                        if (!querySnapshot.empty) {
                            return {
                                eventTitle: experienceTitle,
                                data: querySnapshot.docs[0].data()
                            };
                        }
                        return null;
                    });
                    allPromises.push(promise);
                });
            });
            
            // Once all queries are done
            const results = await Promise.all(allPromises);
            const calculatedCooldowns = {};

            results.forEach(result => {
                if (result) {
                    const category = result.eventTitle;
                    const experienceCooldown = experiencesList[category][result.eventTitle].cooldown;
                    const lastPostedTime = result.data.timestamp;
                    const currentTime = new Date().getTime();
                    const elapsedTime = currentTime - lastPostedTime;
                    const remainingCooldown = experienceCooldown - elapsedTime;

                    if (remainingCooldown > 0) {
                        calculatedCooldowns[result.eventTitle] = remainingCooldown;
                    }
                }
            });

            setCooldowns(calculatedCooldowns);
            setCooldownsLoading(false);
        };

        fetchCooldowns();
    }, []);

    return (
        <CooldownContext.Provider value={{cooldowns, cooldownsLoading}}>
            {children}
        </CooldownContext.Provider>
    );
}