import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/assets/styles/HPFeaturedPets.css';

const FeaturedPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pets');
                setPets(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching pets data. Please try again later.');
                console.error("Error fetching pets data:", error);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <p>Loading pets...</p>;
    if (error) return <p>{error}</p>;

    const renderPetCard = (pet, uniqueKey) => {
        // קביעת className דינמית עבור סטטוס
        const statusClass = pet.status === 'אומץ' ? 'status-adopted' : 'status-new';

        return (
            <div className="pet-card" key={uniqueKey}>
                <img
                    src={pet.imageUrl || 'https://via.placeholder.com/150'}
                    alt={pet.name}
                />
                <div className="pet-card-content">
                    <div>
                        <h3>{pet.name}</h3>
                        {/* הוספת className דינמי לסטטוס */}
                        <span className={`pet-status ${statusClass}`}>{pet.status}</span>
                        <p className="pet-info">{`${pet.gender} | ${pet.breed} | ${pet.age}`}</p>
                        <p className="pet-description">{pet.description}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderPetCards = () => {
        const allCards = [];
        pets.forEach((pet, index) => {
            allCards.push(renderPetCard(pet, `original-${pet._id}-${index}`));
        });
        return allCards;
    };

    return (
        <section className="featured-pets">
            <h2>בעלי חיים לאימוץ</h2>
            <div className="pets-scroll-container">
                <div className="pets-grid">
                    {renderPetCards()}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPets;
