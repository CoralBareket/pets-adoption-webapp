import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/UserProfile.css';
import logo2 from '../assets/images/logos/logo2.png'; 

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [isSaving, setIsSaving] = useState(false); 
  const [editData, setEditData] = useState({
    phoneNumber: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { 
            Authorization: `Bearer ${JSON.parse(loggedInUser).token}` 
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
          navigate('/');
        }
      }
    };
    fetchUserData();
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
    try {
      const response = await axios.put('/api/users/profile', editData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
        }
      });
      setUserData(response.data); 
      setIsEditing(false); 
      setIsSaving(false); 
    } catch (error) {
      console.error('Failed to update user data', error);
      setIsSaving(false); 
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>אזור אישי</h1>
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
            <p>
            <p>שם מלא: {userData.fullName}</p>
            <p>תעודת זהות: {userData.idNumber}</p>
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
      <h2>היסטוריית האימוץ שלך</h2>
      <div className="adoption-history">
        {userData.adoptionHistory && userData.adoptionHistory.length > 0 ? (
          <ul>
            {userData.adoptionHistory.map(adoption => (
              <li key={adoption.pet._id}>
                <h3>{adoption.pet.name}</h3>
                <img src={adoption.pet.imageUrl} alt={adoption.pet.name} width="100" /> 
                <p>מין: {adoption.pet.gender}</p>
                <p>גזע: {adoption.pet.breed}</p>
                <p>אומץ בתאריך: {new Date(adoption.adoptionDate).toLocaleDateString('he-IL')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-adoptions">
            עדיין לא אימצת חיות מחמד. <a href="/matching-quiz">מצא את ההתאמה המושלמת עכשיו!</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
