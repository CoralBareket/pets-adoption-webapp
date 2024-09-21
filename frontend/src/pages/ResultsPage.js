import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../src/assets/styles/ResultsPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const { matchedPets } = location.state || { matchedPets: [] };

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
                                    <button className="adopt-button">אמץ אותי</button>
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
        </div>
    );
};

export default ResultsPage;