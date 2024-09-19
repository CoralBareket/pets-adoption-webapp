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

    const renderPetCards = () => {
        const cards = pets.map((pet) => (
            <div className="pet-card" key={pet._id}>
                <img
                    src={pet.imageUrl || 'https://via.placeholder.com/150'}
                    alt={pet.name}
                />
                <div className="pet-card-content">
                    <h3>{pet.name}</h3>
                    <span className="pet-status">{pet.status}</span>
                    <p className="pet-info">{`${pet.gender} | ${pet.breed} | ${pet.age}`}</p>
                    <p className="pet-description">{pet.description}</p>
                    <button>לפרטים</button>
                </div>
            </div>
        ));

        // שכפול הכרטיסיות כדי ליצור אפקט אינסופי
        return [...cards, ...cards];
    };

    return (
        <section className="featured-pets">
            <h2>בעלי חיים לאימוץ</h2>
            <div className="pets-container">
                <div className="pets-grid">
                    {renderPetCards()}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPets;