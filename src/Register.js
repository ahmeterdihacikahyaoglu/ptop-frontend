import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü kontrolü

    const handleRegister = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            username: username,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            } else {
                const errorData = await response.json();
                alert(`Kayıt başarısız: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
            alert("Kayıt işlemi başarısız. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="register-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="email">E-posta</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta"
                    required
                />

                <label htmlFor="username">Kullanıcı Adı</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı Adı"
                    required
                />

                <label htmlFor="password">Şifre</label>
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Şifre"
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>

                <button type="submit" className="register-button">Kayıt Ol</button>
            </form>
            <div className="login-link">
                <Link to="/login">Giriş Yap</Link>
            </div>
        </div>
    );
}

export default Register;
