import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pets" element={<PetsPage />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route path="/products/edit/:id" element={<EditProductPage />} />
                <Route path="/products" element={<ProductsPage />} />
                {/* Other routes here */}
                <Route path="*" element={<PetsPage />} /> {/* Fallback Route */}
            </Routes>
        </Router>
    );
}

export default App;
