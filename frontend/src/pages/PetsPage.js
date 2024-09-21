import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/assets/styles/PetsPage.css';

const PetsPage = ({ petsToShow }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (petsToShow) {
            console.log("Pets from props:", petsToShow);
            setPets(petsToShow);
        } else {
            const fetchPets = async () => {
                try {
                    const { data } = await axios.get('/api/pets');
                    console.log("API response:", data); // Log the API response
                    setPets(data);
                } catch (error) {
                    console.error("Error fetching pets:", error);
                }
            };
            fetchPets();
        }
    }, [petsToShow]);

    console.log("Current pets state:", pets); // Log the current state

    return (
        <div className="pets-page">
            <h1>{petsToShow ? 'חיות מחמד מתאימות' : 'כל החיות הזמינות לאימוץ'}</h1>
            <ul className="pets-list">
                {pets.map(pet => (
                    <li key={pet._id} className="pet-item">
                        <img src={pet.imageUrl} alt={pet.name} />
                        <div className="pet-info">
                            <h2>{pet.name}</h2>
                            <p>גיל: {pet.age}</p>
                            <p>גזע: {pet.breed}</p>
                            <p>{pet.description}</p>
                            <button className="adopt-button">אמץ אותי</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetsPage;
