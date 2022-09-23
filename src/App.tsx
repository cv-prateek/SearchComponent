import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/search';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();
export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
