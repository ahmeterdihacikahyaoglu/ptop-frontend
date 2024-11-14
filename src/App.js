// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile'; // Profile bileşeni eklendi
import './App.css';
import AddProduct from './AddProduct';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} /> {/* Profil sayfası rotası */}
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
