import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Login />} exact />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<PrivateRoute element = {<Home />} />} />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
