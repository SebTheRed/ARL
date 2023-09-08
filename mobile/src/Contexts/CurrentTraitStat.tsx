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
    const [currentTraitStat, setCurrentTraitStat] = useState<String>();
    return <CurrentTraitStat.Provider value={{ currentTraitStat, setCurrentTraitStat }}>{children}</CurrentTraitStat.Provider>;
  };