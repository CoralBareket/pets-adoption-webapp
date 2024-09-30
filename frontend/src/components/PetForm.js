import React, { useState, useEffect } from 'react';
import '../../src/assets/styles/PetForm.css';

const PetForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    breed: '',
    description: '',
    imageUrl: '',
    status: 'חדש באתר',
    location: '',
    size: '',
    activity: ''
  });

  useEffect(() => {
    document.body.classList.add('pet-form-open');

    return () => {
      document.body.classList.remove('pet-form-open');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const requestData = { ...formData }; 
    console.log('Data to be sent:', requestData); 
  
    try {
      const response = await fetch('http://localhost:5000/api/pets', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), 
      });
  
      if (response.ok) { 
        alert('החיה נשמרה בהצלחה!');
        onClose(); 
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(`שגיאה בשליחת הטופס: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error); 
      alert('שגיאה בשרת');
    }
  };

  return (
    <div className="pet-form-overlay">
      <div className="pet-form-container">
        <div className="pet-form-content">
          <h2>הוסף חיה חדשה למאגר</h2>
          <form onSubmit={handleSubmit}>
            <h3>פרטי החיה</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם החיה"
              required
            />
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="גיל החיה"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר מגדר</option>
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
            </select>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר גזע</option>
              <option value="מעורב">מעורב</option>
              <option value="שועלי">שועלי</option>
              <option value="פינצר">פינצר</option>
              <option value="האסקי סיבירי">האסקי סיבירי</option>
              <option value="טרייר">טרייר</option>
              <option value="ביגל">ביגל</option>
              <option value="חתול פרסי">חתול פרסי</option>
              <option value="לברדור">לברדור</option>
              <option value="רועה גרמני">רועה גרמני</option>
              <option value="שיצו">שיצו</option>
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="תיאור החיה"
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="קישור לתמונה"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="מיקום"
            />
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר גודל</option>
              <option value="small">קטן</option>
              <option value="medium">בינוני</option>
              <option value="large">גדול</option>
            </select>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר רמת פעילות</option>
              <option value="low">נמוכה</option>
              <option value="moderate">בינונית</option>
              <option value="high">גבוהה</option>
            </select>
            <div className="form-buttons">
              <button type="submit">הוסף חיה</button>
              <button type="button" onClick={onClose}>סגור</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetForm;