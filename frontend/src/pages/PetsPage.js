import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import PetForm from '../components/PetForm';
import '../../src/assets/styles/PetsPage.css';
import logo2 from '../assets/images/logos/logo2.png';

const PetsPage = ({ petsToShow, isAdmin }) => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (petsToShow) {
            setPets(petsToShow);
        } else {
            const fetchPets = async () => {
                try {
                    const { data } = await axios.get('/api/pets');
                    const filteredPets = data.filter(pet => pet.status === 'חדש באתר');
                    setPets(filteredPets);
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

    const handleDeletePet = async (petId) => {
        try {
            await axios.delete(`/api/pets/${petId}`);
            setPets(pets.filter(pet => pet._id !== petId));
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const handleAddPetClick = () => {
        setShowAddPetForm(true);
    };

    const handleCloseAddPetForm = () => {
        setShowAddPetForm(false);
    };

    return (
        <div className="pets-page">
            <div className="pets-header">
                <div className="logo-container">
                    <img
                        src={logo2}
                        alt="Logo"
                        className="logo-small"
                        onClick={() => navigate('/')}
                    />
                </div>
                <h1>{petsToShow ? 'חיות מחמד מתאימות' : 'כל החיות הזמינות לאימוץ'}</h1>
            </div>
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
                            {isAdmin && (
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeletePet(pet._id)}
                                >
                                מחק
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {selectedPet && <AdoptionForm pet={selectedPet} onClose={handleCloseForm} />}
            
            {isAdmin && (
                <div>
                    <button className="add-pet-button" onClick={handleAddPetClick}>
                        +
                    </button>
                    {showAddPetForm && <PetForm onClose={handleCloseAddPetForm} />}
                </div>
            )}
        </div>
    );
};

export default PetsPage;