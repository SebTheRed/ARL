import React, {createContext,useContext,useState,useEffect} from 'react'

const CooldownContext = createContext({});

export const useCooldown = () => {
    return useContext(CooldownContext)
}

export const CooldownProvider = ({children}:any) => {
    const [cooldowns,setCooldowns] = useState({})
    useEffect(()=>{

    },[])



    return(
        <CooldownContext.Provider value={cooldowns}>
            {children}
        </CooldownContext.Provider>
    )
}