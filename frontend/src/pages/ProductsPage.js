import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <Link to="/products/add">Add New Product</Link>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <img src={product.imageUrl} alt={product.name} width="100" />
                        <Link to={`/products/edit/${product._id}`}>Edit</Link>
                        {/* Add delete functionality as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
