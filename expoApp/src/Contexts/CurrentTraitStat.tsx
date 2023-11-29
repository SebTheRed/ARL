import React, { createContext, useContext, useState } from 'react';

const CurrentTraitStat = createContext({});

export const useCurrentTraitStat = () => {
    const context = useContext(CurrentTraitStat);
    if (!context) {
      throw new Error('useCurrentTraitStat must be used within a CurrentTraitStatProvider');
    }
    return context;
  };
  
  export const CurrentTraitStatProvider = ({ children }:any) => {
    const [currentTraitTitle, setCurrentTraitTitle] = useState<String>();
    const [currentStats,setCurrentStats] = useState<Object>()

    const generateStats = () => {
        //THIS IS WHERE WE PULL ALL XP LOGS AND DO MATH ON 'EM
    }

    return <CurrentTraitStat.Provider value={{ currentTraitTitle, setCurrentTraitTitle,generateStats }}>{children}</CurrentTraitStat.Provider>;
  };