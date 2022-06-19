import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Results from './routes/Results';
import Symptoms from './routes/Symptoms';
import SymptomChecker from './routes/SymtomChecker';

function App() {
  return (
    <BrowserRouter>
      <h1 className='text-4xl text-center'>
        <Link to="/">Symptom-Checker</Link>
      </h1>
      <Routes>
        <Route path="/" element={<SymptomChecker />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
