import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetsPage = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await axios.get('/api/pets');
                console.log(data);  // Add this line to debug
                setPets(data);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };
    
        fetchPets();
    }, []);
    

    return (
        <div>
            <h1>Available Pets</h1>
            <ul>
                {pets.map(pet => (
                    <li key={pet._id}>
                        <h2>{pet.name}</h2>
                        <p>Age: {pet.age}</p>
                        <p>Breed: {pet.breed}</p>
                        <p>{pet.description}</p>
                        <img src={pet.imageUrl} alt={pet.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetsPage;
