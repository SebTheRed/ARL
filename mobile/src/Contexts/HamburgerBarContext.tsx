import React, { createContext, useContext, useState } from 'react';

const HamburgerBarContext = createContext({})

export const useHamburgerBar = () => {
    const context = useContext(HamburgerBarContext)
    if (!context){
        console.error("huh?")
    }
    return context;
}
export const LastPageProvider = ({children}:any) => {
    const [hamburgerToggle,setHamburgerToggle] = useState("");
    return (<HamburgerBarContext.Provider value={{hamburgerToggle,setHamburgerToggle}}>{children}</HamburgerBarContext.Provider>)
}