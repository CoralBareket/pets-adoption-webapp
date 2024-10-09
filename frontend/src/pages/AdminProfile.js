import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../src/assets/styles/AdminProfile.css';
import logo2 from '../assets/images/logos/logo2.png';

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    phoneNumber: '',
    email: '',
  });
  const [newPet, setNewPet] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    gender: '',
    imageUrl: '',
  });
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || !loggedInUser.token) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { 
            Authorization: `Bearer ${loggedInUser.token}`
          }
        });
        setUserData(response.data);
        setEditData({
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
        if (error.response && error.response.status === 401) {
          // Redirect to home if unauthorized
          navigate('/');
        }
      }
    };

    const fetchPets = async () => {
      try {
        const response = await axios.get('/api/pets');
        setPets(response.data);
      } catch (error) {
        console.error('Failed to fetch pets', error);
      }
    };

    fetchUserData();
    fetchPets();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      phoneNumber: userData.phoneNumber,
      email: userData.email,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    try {
      const response = await axios.put('/api/users/profile', editData, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user data', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewPetChange = (e) => {
    setNewPet({
      ...newPet,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    try {
      const response = await axios.post('/api/pets', newPet, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
      setPets([...pets, response.data]);
      setNewPet({
        name: '',
        type: '',
        breed: '',
        age: '',
        gender: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Failed to add new pet', error);
    }
  };

  const handleDeletePet = async (petId) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    try {
      await axios.delete(`/api/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
      setPets(pets.filter(pet => pet._id !== petId));
    } catch (error) {
      console.error('Failed to delete pet', error);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>אזור אישי - מנהל</h1>
        <img
          src={logo2}
          alt="Logo"
          className="logo-small"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="user-info">
        {isEditing ? (
          <>
            <p>שם מלא: {userData.fullName}</p>
            <p>תעודת זהות: {userData.idNumber}</p>
            <p>
              מספר טלפון: 
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleChange}
              />
            </p>
            <p>
              אימייל: 
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </p>
            <button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'שומר...' : 'שמור'}
            </button>
            <button onClick={handleCancel} disabled={isSaving}>
              ביטול
            </button>
          </>
        ) : (
          <>
            <p>שם מלא: {userData.fullName}</p>
            <p>תעודת זהות: {userData.idNumber}</p>
            <p>מספר טלפון: {userData.phoneNumber}</p>
            <p>אימייל: {userData.email}</p>
            <button onClick={handleEdit}>ערוך</button>
          </>
        )}
      </div>
      <div className="admin-actions">
        <h2>ניהול חיות</h2>
        <form onSubmit={handleAddPet} className="add-pet-form">
          <input
            type="text"
            name="name"
            value={newPet.name}
            onChange={handleNewPetChange}
            placeholder="שם החיה"
            required
          />
          <input
            type="text"
            name="type"
            value={newPet.type}
            onChange={handleNewPetChange}
            placeholder="סוג החיה"
            required
          />
          <input
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={handleNewPetChange}
            placeholder="גזע"
            required
          />
          <input
            type="number"
            name="age"
            value={newPet.age}
            onChange={handleNewPetChange}
            placeholder="גיל"
            required
          />
          <select
            name="gender"
            value={newPet.gender}
            onChange={handleNewPetChange}
            required
          >
            <option value="">בחר מין</option>
            <option value="זכר">זכר</option>
            <option value="נקבה">נקבה</option>
          </select>
          <input
            type="text"
            name="imageUrl"
            value={newPet.imageUrl}
            onChange={handleNewPetChange}
            placeholder="קישור לתמונה"
            required
          />
          <button type="submit">הוסף חיה</button>
        </form>
        <div className="pets-list">
          <h3>רשימת חיות</h3>
          <ul>
            {pets.map(pet => (
              <li key={pet._id}>
                <img src={pet.imageUrl} alt={pet.name} width="50" />
                <span>{pet.name} - {pet.type} - {pet.breed}</span>
                <button onClick={() => handleDeletePet(pet._id)}>מחק</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
