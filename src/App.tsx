import './App.css';
import { Header } from './components/header/header';
import { Body } from './components/body/body';
import React from 'react';
import { Background } from './background/background'; 
import { SiteProvider } from './pages/globalcontext';

function App() {
  return (
    <div className="App">
      <SiteProvider>
        <Background/>
        <Header/>
        <Body/>
      </SiteProvider>
    </div>
  );
}

export default App;
