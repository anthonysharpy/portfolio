import './App.css';
import { Header } from './components/header/header';
import { Body } from './components/body/body';
import React, { useState } from 'react';
import { Background } from './components/background/background'; 
import { Page } from './pages/page';
import { GetPage } from './pages/pagecontroller';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(GetPage("home"));

  return (
    <div className="App">
      <Background/>
      <Header currentPage={currentPage}/>
      <Body currentPage={currentPage}/>
    </div>
  );
}

export default App;
