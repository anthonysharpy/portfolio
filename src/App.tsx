import './App.css';
import { Header } from './components/header/header';
import { Body } from './components/body/body';
import React, { createContext, useState } from 'react';
import { Background } from './components/background/background'; 
import { Page } from './pages/page';
import { GetPage } from './pages/pagecontroller';

interface CurrentPageContextType {
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
}

export const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

function App() {
  const [currentPage, setCurrentPage] = useState(GetPage("home"));

  return (
    <div className="App">
      <CurrentPageContext.Provider value={{currentPage, setCurrentPage}}>
        <Background/>
        <Header/>
        <Body/>
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
