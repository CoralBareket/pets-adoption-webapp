import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import '../../src/assets/styles/SearchResultsPage.css';
import logo2 from '../assets/images/logos/logo2.png';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };
    const [selectedPet, setSelectedPet] = useState(null);
    const navigate = useNavigate();

    const handleAdoptClick = (pet) => {
        setSelectedPet(pet);
    };

    const handleCloseForm = () => {
        setSelectedPet(null);
    };

    return (
        <div className="results-page">
            <div className="results-header">
                <div className="logo-container">
                    <img
                        src={logo2}
                        alt="Logo"
                        className="logo-small"
                        onClick={() => navigate('/')}
                    />
                </div>
                <h2>תוצאות החיפוש</h2>
            </div>
            {searchResults.groups.length > 0 ? (
                <>
                    <p className="results-count">מצאנו {searchResults.groups.length} תוצאות שמתאימות לחיפוש שלך!</p>
                    <ul className="results-list">
                        {searchResults.groups.map((group, index) => (
                            group.pets.map((pet) => (
                                <li key={pet._id} className="pet-item">
                                    <div className="pet-image">
                                        <img src={pet.imageUrl || '/placeholder-image.jpg'} alt={pet.name} />
                                        <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>אמץ אותי</button>
                                    </div>
                                    <div className="pet-info">
                                        <h3>{pet.name}</h3>
                                        {pet.breed && <p><strong>גזע:</strong> {pet.breed}</p>}
                                        {pet.gender && <p><strong>מין:</strong> {pet.gender}</p>}
                                        {pet.description && <p><strong>תיאור:</strong> {pet.description}</p>}
                                        {pet.size && <p><strong>גודל:</strong> {pet.size}</p>}
                                        {pet.age && <p><strong>גיל:</strong> {pet.age} שנים</p>}
                                        {pet.activity && <p><strong>רמת פעילות:</strong> {pet.activity}</p>}
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                </>
            ) : (
                <div className="no-results">
                    <p>לא נמצאו תוצאות לחיפוש שלך.</p>
                    <Link to="/" className="view-all-link">חזור לחיפוש</Link>
                </div>
            )}
            {selectedPet && <AdoptionForm pet={selectedPet} onClose={handleCloseForm} />}
        </div>
    );
};

export default SearchResults;
