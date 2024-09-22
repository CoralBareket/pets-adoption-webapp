import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdoptionForm from '../components/AdoptionForm';
import '../../src/assets/styles/PetsPage.css';

const PetsPage = ({ petsToShow }) => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        if (petsToShow) {
            console.log("Pets from props:", petsToShow);
            setPets(petsToShow);
        } else {
            const fetchPets = async () => {
                try {
                    const { data } = await axios.get('/api/pets');
                    console.log("API response:", data);
                    setPets(data);
                } catch (error) {
                    console.error("Error fetching pets:", error);
                }
            };
            fetchPets();
        }
    }, [petsToShow]);

    const handleAdoptClick = (pet) => {
        setSelectedPet(pet);
    };

    const handleCloseForm = () => {
        setSelectedPet(null);
    };

    console.log("Current pets state:", pets);

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
                            <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>אמץ אותי</button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedPet && <AdoptionForm pet={selectedPet} onClose={handleCloseForm} />}
        </div>
    );
};

export default PetsPage;