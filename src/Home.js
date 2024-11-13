// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>pTOp Dünyasına Hoş Geldiniz!</h1>
            <p>Giriş yapın veya yeni bir hesap oluşturun.</p>
            <div className="button-group">
                <Link to="/login">
                    <button className="home-button">Giriş Yap</button>
                </Link>
                <Link to="/register">
                    <button className="home-button">Kayıt Ol</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
