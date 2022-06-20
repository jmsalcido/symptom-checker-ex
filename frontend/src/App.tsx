import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from './routes/Results';
import SymptomChecker from './routes/SymptomChecker';
import Home from './routes/Home';
import NavBar from './components/Navigation/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className='h-screen flex flex-col'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
