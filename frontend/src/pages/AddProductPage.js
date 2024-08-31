import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddProductPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/products', product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token in localStorage
                }
            });
            alert('Product added successfully');
            navigate('/products'); // Navigate to products page
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                />
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
