import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pagini/home';
import About from './pagini/abaut';
import Contact from './pagini/contact';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
