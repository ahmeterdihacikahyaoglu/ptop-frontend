import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü kontrolü
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                localStorage.setItem("userId", data.userId);
                navigate("/profile");
            } else {
                const errorData = await response.json();
                alert(`Giriş başarısız: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Giriş işlemi sırasında bir hata oluştu:", error);
            alert("Giriş işlemi başarısız. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="login-container">
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-posta veya Kullanıcı Adı</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta veya Kullanıcı Adı"
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

                <button type="submit" className="login-button">Giriş Yap</button>
            </form>
            <div className="home-link">
                <Link to="/">Ana Sayfa</Link>
            </div>
        </div>
    );
}

export default Login;
