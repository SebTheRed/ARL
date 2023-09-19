import React, { createContext, useContext, useState } from 'react';

const LastPageContext = createContext({})
    export const useLastPage = () => {
        const context = useContext(LastPageContext)
        if (!context){
            console.error("huh?")
        }
        return context;
    }

    export const LastPageProvider = ({children}:any) => {
        const [lastPage,setLastPage] = useState("");
        return (<LastPageContext.Provider value={{lastPage,setLastPage}}>{children}</LastPageContext.Provider>)
    }