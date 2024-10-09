import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import PetForm from '../components/PetForm';
import '../../src/assets/styles/PetsPage.css';
import logo2 from '../assets/images/logos/logo2.png';

const PetsPage = ({ petsToShow }) => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // ניהול ה-state של isAdmin
    const navigate = useNavigate();

    // שליפת פרטי המשתמש מ-localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setIsAdmin(user.isAdmin || false); // קביעת ה-state של isAdmin
        }
    }, []); // הרצת useEffect פעם אחת בתחילת הטעינה

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
