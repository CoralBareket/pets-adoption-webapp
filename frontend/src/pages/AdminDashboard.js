import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GAdoptionsOverTime from '../components/GAdoptionsOverTime';
import GAdoptionsByAnimalType from '../components/GAdoptionsByAnimalType';
import PetForm from '../components/PetForm';
import '../assets/styles/AdminDashboard.css';
import logo2 from '../assets/images/logos/logo2.png';

const AdminDashboard = () => {
  const [setUsersData] = useState([]);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [showPets, setShowPets] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`,
          },
        });
        setUsersData(response.data);
      } catch (error) {
        console.error('Failed to fetch users data', error);
      }
    };
    
    const fetchPets = async () => {
      try {
        const { data } = await axios.get('/api/pets');
        setPets(data);
        setFilteredPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchUsersData();
    fetchPets();
  }, []);

  useEffect(() => {
    const results = pets.filter(pet =>
      Object.values(pet).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPets(results);
  }, [searchTerm, pets]);

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

  const toggleShowPets = () => {
    setShowPets(!showPets);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="logo-container">
          <img
            src={logo2}
            alt="Logo"
            className="logo-small"
            onClick={() => navigate('/')}
          />
        </div>
        <h1 className="dashboard-title">מסך ניהול</h1>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <h2>אימוצים לאורך זמן (יומי)</h2>
          <div className="chart-responsive-container">
            <GAdoptionsOverTime />
          </div>
        </div>

        <div className="chart-container">
          <h2>אימוצים לפי סוג חיה (חודש אחרון)</h2>
          <div className="chart-responsive-container">
            <GAdoptionsByAnimalType />
          </div>
        </div>
      </div>

      <button className="toggle-pets-button" onClick={toggleShowPets}>
        {showPets ? 'הסתר חיות' : 'הצג חיות'}
      </button>

      {showPets && (
        <>
          <input
            type="text"
            placeholder="חפש חיה..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <table className="pets-table">
            <thead>
              <tr>
                <th>שם</th>
                <th>גיל</th>
                <th>גזע</th>
                <th>תיאור</th>
                <th>תמונה</th>
                <th>מחיקה</th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.map(pet => (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.description}</td>
                  <td>
                    <img src={pet.imageUrl} alt={pet.name} width="50" height="50" />
                  </td>
                  <td>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeletePet(pet._id)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <button className="add-pet-button" onClick={handleAddPetClick} title="להוסיף חיה חדשה">
        +
      </button>
      {showAddPetForm && <PetForm onClose={handleCloseAddPetForm} />}
    </div>
  );
};

export default AdminDashboard;