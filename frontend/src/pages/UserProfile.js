import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        // Handle error (e.g., redirect to login if unauthorized)
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchUserData();
  }, [user, navigate]);

  if (!user) return null; // This shouldn't render, as we redirect in useEffect
  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h1>ברוך הבא, {userData.fullName}!</h1>
      <p>מספר תעודת זהות: {userData.idNumber}</p>
      <p>מספר טלפון: {userData.phoneNumber}</p>
      <p>אימייל: {userData.email}</p>
      <h2>היסטוריית האימוץ שלך</h2>
      {userData.adoptionHistory.length > 0 ? (
        <ul>
          {userData.adoptionHistory.map(adoption => (
            <li key={adoption.pet._id}>
              {adoption.pet.name} - אומץ בתאריך {new Date(adoption.adoptionDate).toLocaleDateString('he-IL')}
            </li>
          ))}
        </ul>
      ) : (
        <p>עדיין לא אימצת חיות מחמד. <a href="/matching-quiz">מצא את ההתאמה המושלמת עכשיו!</a></p>
      )}
    </div>
  );
};

export default UserProfile;