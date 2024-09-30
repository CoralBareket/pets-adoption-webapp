import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdoptionForm from '../components/AdoptionForm';
import PetForm from '../components/PetForm'; // ייבוא טופס הוספת חיה חדשה
import '../../src/assets/styles/PetsPage.css';

const PetsPage = ({ petsToShow, isAdmin }) => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [showAddPetForm, setShowAddPetForm] = useState(false); // מצב עבור טופס הוספת חיה

    useEffect(() => {
        if (petsToShow) {
            setPets(petsToShow);
        } else {
            const fetchPets = async () => {
                try {
                    const { data } = await axios.get('/api/pets');
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

    const handleDeletePet = async (petId) => {
        try {
            await axios.delete(`/api/pets/${petId}`);
            setPets(pets.filter(pet => pet._id !== petId));
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    /* עדכון סטטוס במקום מחיקה מהDB

    const handleDeletePet = async (petId) => {
    try {
        // נשלח בקשת PATCH לעדכון הסטטוס של החיה
        const response = await axios.patch(`/api/pets/${petId}`, {
            status: 'הוסרה' // נעדכן את הסטטוס ל"הוסרה"
        });

        if (response.status === 200) {
            // נעדכן את רשימת החיות על ידי שינוי הסטטוס של החיה ברשימה הקיימת
            setPets(pets.map(pet => 
                pet._id === petId ? { ...pet, status: 'הוסרה' } : pet
            ));
        }
    } 
    catch (error) {
        console.error("Error updating pet status:", error);
        }
    };
    */

    const handleAddPetClick = () => {
        setShowAddPetForm(true); // פתיחת טופס הוספת חיה
    };

    const handleCloseAddPetForm = () => {
        setShowAddPetForm(false); // סגירת טופס הוספת חיה
    };

    return (
        <div className="pets-page">
            <h1>{petsToShow ? '   חיות מחמד מתאימות' : '   כל החיות הזמינות לאימוץ'}</h1>
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
                    {showAddPetForm && <PetForm onClose={handleCloseAddPetForm} />} {/* הצגת טופס הוספת חיה */}
                </div>
            )}
        </div>
    );
};

export default PetsPage;
