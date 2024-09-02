import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If using axios
import '../../src/assets/styles/HPFeaturedPets.css';

const FeaturedPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('/api/pets');
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets data:", error);
            }
        };

        fetchPets();
    }, []);

    return (
        <section className="featured-pets">
            <h2>בעלי חיים לאימוץ</h2>
            <div className="pets-grid">
                {pets.map((pet, index) => (
                    <div className="pet-card" key={index}>
                        <img src={pet.imageUrl} alt={pet.name} />
                        <h3>{pet.name}</h3>
                        <p>{pet.description}</p>
                        <button>לפרטים</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedPets;
