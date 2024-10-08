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
    activity: '',
    animalType: '' 
  });

  // רשימת הגזעים מסונן לפי סוג חיה
  const breeds = {
    כלב: ['מעורב', 'שועלי', 'פינצר', 'האסקי סיבירי', 'טרייר', 'ביגל', 'לברדור', 'רועה גרמני', 'שיצו'],
    חתול: ['חתול פרסי', 'חתול חבשי', 'חתול סיאמי'], 
    אחר: ['אחר']
  };

  const filteredBreeds = formData.animalType ? breeds[formData.animalType] : [];

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
  
    if (isNaN(formData.age) || formData.age <= 0) {
      alert("גיל חייב להיות מספר חיובי.");
      return;
    }
  
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
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="גיל החיה (במספרים בלבד)"
              min="0"
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
              name="animalType"
              value={formData.animalType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר סוג חיה</option>
              <option value="כלב">כלב</option>
              <option value="חתול">חתול</option>
              <option value="אחר">אחר</option>
            </select>

            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              disabled={!formData.animalType} 
            >
              <option value="" disabled>בחר גזע</option>
              {filteredBreeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
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
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר מיקום</option>
              <option value="צפון">צפון</option>
              <option value="מרכז">מרכז</option>
              <option value="דרום">דרום</option>
            </select>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר גודל</option>
              <option value="קטן">קטן</option>
              <option value="בינוני">בינוני</option>
              <option value="גדול">גדול</option>
            </select>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>בחר רמת פעילות</option>
              <option value="נמוכה">נמוכה</option>
              <option value="בינונית">בינונית</option>
              <option value="גבוהה">גבוהה</option>
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
