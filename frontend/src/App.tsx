import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Results from './routes/Results';
import Symptoms from './routes/Symptoms';
import SymptomChecker from './routes/SymptomChecker';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className='text-3xl text-left font-semibold p-4'>
          <Link to="/">SSymptomC.</Link>
        </h1>
        <Routes>
          <Route path="/" element={<SymptomChecker />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
