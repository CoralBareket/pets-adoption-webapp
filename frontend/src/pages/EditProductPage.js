import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProductPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${id}`, product);
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProductPage;
