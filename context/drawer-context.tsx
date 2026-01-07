'use client'

import React from "react";

const DrawerContext = React.createContext<any>(null);

export const useDrawerContext = () => {
  return React.useContext(DrawerContext);
};

const DrawerContextProvider = ({ children }: { children: React.ReactNode}) => {
 const [ isOpen, setIsOpen] = React.useState(false)

  return (
    <DrawerContext.Provider
      value={{
            isOpen, setIsOpen
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
