import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", description);
        formData.append("startingPrice", startingPrice);
        formData.append("image", image);
    
        try {
            const response = await fetch("http://localhost:8080/api/products/add", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                alert("Ürün başarıyla eklendi!");
            } else {
                alert("Ürün eklenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Ürün eklenirken bir hata oluştu.");
        }
    };

    return (
        <div className="add-product-container">
            <h2>Ürün Ekle</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <label>Ürün Adı:</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

                <label>Açıklama:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <label>Başlangıç Fiyatı (TL):</label>
                <input type="number" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} min="1" required />

                <label>Ürün Resmi:</label>
                <input type="file" onChange={handleImageChange} />

                <button type="submit" className="submit-button">Ürün Ekle</button>
            </form>
        </div>
    );
}

export default AddProduct;
