import React, { createContext, useContext, useState } from 'react';

const UIDContext = createContext({});

export const useUID = () => {
  const context = useContext(UIDContext);
  if (!context) {
    throw new Error('useUID must be used within a UIDProvider');
  }
  return context;
};

export const UIDProvider = ({ children }:any) => {
  const [uid, setUID] = useState('some_initial_value');
  return <UIDContext.Provider value={{ uid, setUID }}>{children}</UIDContext.Provider>;
};