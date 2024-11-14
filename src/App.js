import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import AddProduct from './AddProduct'; // Ürün ekleme sayfası
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/add-product" element={<AddProduct />} /> {/* Ürün ekleme rotası */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
