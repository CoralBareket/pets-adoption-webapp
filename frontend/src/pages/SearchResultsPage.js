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
            {searchResults.length > 0 ? (
                <>
                    <p className="results-count">מצאנו {searchResults.length} תוצאות שמתאימות לחיפוש שלך!</p>
                    <ul className="results-list">
                        {searchResults.map((group, index) => (
                            <li key={index} className="pet-item">
                                <div className="pet-image">
                                    <img src={group.pets[0].imageUrl || '/placeholder-image.jpg'} alt={group.breed} />
                                </div>
                                <div className="pet-info">
                                <h3>{group.breed}</h3>
                                    <p>מיקום: {group.location}</p>
                                    <p>קבוצת גיל: {group.ageGroup}</p>
                                    <p>מספר חיות מחמד: {group.count}</p>
                                    <ul className="pet-details">
                                        {group.pets
                                            .filter(pet => pet.status === 'חדש באתר') 
                                            .map(pet => (
                                                <li key={pet._id}>
                                                    <span className="pet-name">
                                                        <Link to={`/pet/${pet._id}`}>{pet.name}</Link>
                                                    </span>
                                                    <span className="pet-age">גיל: {pet.age}</span>
                                                    <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>אמץ אותי</button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
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