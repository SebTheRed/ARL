import React, { createContext, useContext, useState } from 'react';

const CurrentEventContext = createContext({});

export const useCurrentEvent = () => {
    const context = useContext(CurrentEventContext);
    if (!context) {
      throw new Error('useCurrentEvent must be used within a CurrentEventProvider');
    }
    return context;
  };
  
  export const UIDProvider = ({ children }:any) => {
    const [currentEvent, setCurrentEvent] = useState({});
    return <CurrentEventContext.Provider value={{ currentEvent, setCurrentEvent }}>{children}</CurrentEventContext.Provider>;
  };