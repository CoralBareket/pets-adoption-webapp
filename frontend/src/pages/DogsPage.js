import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DogsPage = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const { data } = await axios.get('/api/dogs');
                console.log(data);  // Add this line to debug
                setDogs(data);
            } catch (error) {
                console.error("Error fetching dogs:", error);
            }
        };
    
        fetchDogs();
    }, []);
    

    return (
        <div>
            <h1>Available Dogs</h1>
            <ul>
                {dogs.map(dog => (
                    <li key={dog._id}>
                        <h2>{dog.name}</h2>
                        <p>Age: {dog.age}</p>
                        <p>Breed: {dog.breed}</p>
                        <p>{dog.description}</p>
                        <img src={dog.imageUrl} alt={dog.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogsPage;
