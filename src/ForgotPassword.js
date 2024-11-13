// src/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Giriş Yap yönlendirmesi için Link bileşenini ekliyoruz
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Şifre sıfırlama isteği gönderildi:', email);
        // Burada şifre sıfırlama talebini sunucuya gönderebilirsiniz
    };

    return (
        <div className="forgot-password-container">
            <h2>Şifremi Unuttum</h2>
            <p>Lütfen hesabınıza bağlı e-posta adresinizi girin. Şifre sıfırlama bağlantısını size gönderelim.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-posta</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta"
                    required
                />
                <button type="submit" className="forgot-password-button">Gönder</button>
            </form>

            <div className="login-link">
                <span>Hesabınıza dönmek ister misiniz?</span> <Link to="/">Giriş Yap</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
