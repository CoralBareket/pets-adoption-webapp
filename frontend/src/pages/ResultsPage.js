import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import '../../src/assets/styles/ResultsPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const { matchedPets } = location.state || { matchedPets: [] };
    const [selectedPet, setSelectedPet] = useState(null);

    const handleAdoptClick = (pet) => {
        setSelectedPet(pet);
    };

    const handleCloseForm = () => {
        setSelectedPet(null);
    };

    return (
        <div className="results-page">
            <h2>תוצאות ההתאמה</h2>
            {matchedPets.length > 0 ? (
                <>
                    <p>מצאנו {matchedPets.length} חיות מחמד שמתאימות לך!</p>
                    <ul className="results-list">
                        {matchedPets.map(pet => (
                            <li key={pet._id} className="pet-item">
                                <div className="pet-image">
                                    <img src={pet.imageUrl} alt={pet.name} />
                                </div>
                                <div className="pet-info">
                                    <h3>{pet.name}</h3>
                                    <p>גיל: {pet.age}</p>
                                    <p>גזע: {pet.breed}</p>
                                    <p>{pet.description}</p>
                                    <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>אמץ אותי</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
                </>
            ) : (
                <div className="no-results">
                    <p>לא נמצאו חיות מחמד מתאימות. אנא נסה שוב את השאלון או צפה בכל החיות הזמינות לאימוץ.</p>
                    <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
                </div>
            )}
            {selectedPet && <AdoptionForm pet={selectedPet} onClose={handleCloseForm} />}
        </div>
    );
};

export default ResultsPage;