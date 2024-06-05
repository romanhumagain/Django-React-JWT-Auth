import React, { useState, useEffect } from 'react';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Home from './pages/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useGetAuthenticatedUser from './hooks/useGetAuthenticatedUser';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}  />
        <Routes>
          <Route path="/" element={<Login setIsAuth={setIsAuthenticated}  />} />
          <Route path="/home" element={<Home setAuthenticatedUser={setAuthenticatedUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
