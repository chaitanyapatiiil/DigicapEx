import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuySell from './Pages/buysell';
import Futures from './Pages/Futures';
import Home from './Pages/Home';
import Login from './Pages/Login';
import News from './Pages/news'; // Import the News page


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buysell" element={<BuySell />} />
        <Route path="/futures" element={<Futures />} />
        <Route path="/news" element={<News />} /> {/* Add News route */}
      </Routes>
    </>
  );
};

export default App;