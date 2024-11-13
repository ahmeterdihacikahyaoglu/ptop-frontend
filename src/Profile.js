import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const [editMode, setEditMode] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Kullanıcı bulunamadı, lütfen giriş yapın.");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.error("Kullanıcı bilgileri getirilemedi.");
                }
            } catch (error) {
                console.error("Bir hata oluştu:", error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        alert("Başarıyla çıkış yapıldı.");
        navigate("/");
    };

    const handleSave = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                alert("Profil güncellendi!");
                setEditMode(null);
            } else {
                const errorData = await response.json();
                alert(`Güncelleme başarısız: ${errorData.message || errorData}`);
            }
        } catch (error) {
            console.error("Bir hata oluştu:", error);
            alert("Güncelleme sırasında bir hata oluştu.");
        }
    };

    return (
        <div className="profile-container">
            <h2>Profil Sayfası</h2>
            
            <div className="profile-info">
                <p><strong>E-posta:</strong> {user.email}</p>
                <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
            </div>

            {/* Güncelleme Seçenekleri */}
            {editMode === null && (
                <div className="update-buttons">
                    <button onClick={() => setEditMode('email')} className="edit-button">E-posta Güncelle</button>
                    <button onClick={() => setEditMode('username')} className="edit-button">Kullanıcı Adı Güncelle</button>
                    <button onClick={() => setEditMode('password')} className="edit-button">Şifre Güncelle</button>
                </div>
            )}

            {/* E-posta Güncelleme Formu */}
            {editMode === 'email' && (
                <div>
                    <label>Yeni E-posta:</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <button onClick={handleSave} className="save-button">Kaydet</button>
                    <button onClick={() => setEditMode(null)} className="cancel-button">İptal</button>
                </div>
            )}

            {/* Kullanıcı Adı Güncelleme Formu */}
            {editMode === 'username' && (
                <div>
                    <label>Yeni Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <button onClick={handleSave} className="save-button">Kaydet</button>
                    <button onClick={() => setEditMode(null)} className="cancel-button">İptal</button>
                </div>
            )}

            {/* Şifre Güncelleme Formu */}
            {editMode === 'password' && (
                <div>
                    <label>Yeni Şifre:</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button onClick={handleSave} className="save-button">Kaydet</button>
                    <button onClick={() => setEditMode(null)} className="cancel-button">İptal</button>
                </div>
            )}

            <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
        </div>
    );
}

export default Profile;
