import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import '../../src/assets/styles/QuizResultsPage.css';

const QuizResults = () => {
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
            <h2>תוצאות שאלון התאמה</h2>
            {matchedPets.length > 0 ? (
                <>
                    <p>מצאנו {matchedPets.length} חיות מחמד שמתאימות לך בדיוק לפי הפרטמטרים שהזנת עבורנו בטופס ההתאמה, איזה כיף!</p>
                    <ul className="results-list">
                        {matchedPets.map(pet => (
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
                        ))}
                    </ul>
                    <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
                </>
            ) : (
                <div className="no-results">
                    <div className="no-results-container">
                        <h3>לא נמצאו חיות מחמד מתאימות</h3>
                        <p>תוכל לנסות למלא שוב את השאלון או לצפות בכל החיות הזמינות לאימוץ באתר.</p>
                        <div className="no-results-buttons">
                            <Link to="/matching-quiz" className="view-all-link">חזרה לשאלון התאמה</Link>
                            <Link to="/pets" className="view-all-link">צפייה בכל החיות לאימוץ</Link>
                            <Link to="/" className="view-all-link">מעבר לדף הבית</Link>
                        </div>
                    </div>
                </div>
            )}
            {selectedPet && <AdoptionForm pet={selectedPet} onClose={handleCloseForm} />}
        </div>
    );
};

export default QuizResults;
