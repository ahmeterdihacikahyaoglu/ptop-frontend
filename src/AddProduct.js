import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddProduct.css';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDescription);
        formData.append("startingPrice", startingPrice);
        if (productImage) {
            formData.append("image", productImage);
        }

        try {
            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Ürün başarıyla eklendi!");
                setProductName('');
                setProductDescription('');
                setStartingPrice('');
                setProductImage(null);
                navigate("/profile");
            } else {
                alert("Ürün eklenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Bir hata oluştu:", error);
            alert("Ürün eklenirken bir hata oluştu.");
        }
    };

    return (
        <div className="add-product-container">
            <h2>Ürün Ekle</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <label>
                    Ürün Adı:
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Açıklama:
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Başlangıç Fiyatı (TL):
                    <input
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Ürün Resmi:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit" className="submit-button">Ürün Ekle</button>
            </form>

            {/* Profil Sayfasına Yönlendirme Linki */}
            <div className="profile-link">
                <Link to="/profile">Profil</Link>
            </div>
        </div>
    );
}

export default AddProduct;
