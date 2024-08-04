import React, { createContext, ReactNode, useState } from 'react';
import { Page } from '../types/page';

interface GlobalContextProps {
  children: ReactNode;
}

interface SiteContextType {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export const SiteContext = createContext<SiteContextType>({
  currentLanguage: 'EN',
  setCurrentLanguage: () => {},
  currentPage: "home",
  setCurrentPage: () => {},
});

export const SiteProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  return (
    <SiteContext.Provider value={{ currentLanguage, setCurrentLanguage, currentPage, setCurrentPage }}>
      {children}
    </SiteContext.Provider>
  );
};