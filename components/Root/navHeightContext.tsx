import React, { createContext, useContext, useState } from 'react';

const NavHeightContext = createContext<{
  navHeight: number;
  setNavHeight: (height: number) => void;
}>({ navHeight: 80, setNavHeight: () => {} });

export const NavHeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [navHeight, setNavHeight] = useState(80);
  return (
    <NavHeightContext.Provider value={{ navHeight, setNavHeight }}>
      {children}
    </NavHeightContext.Provider>
  );
};

export const useNavHeight = () => useContext(NavHeightContext); 