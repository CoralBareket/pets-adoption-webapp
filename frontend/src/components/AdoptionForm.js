import React, { useState, useEffect } from 'react';
import '../../src/assets/styles/AdoptionForm.css';

const AdoptionForm = ({ pet, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    idNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardHolderID: '',
    adoptionPackage: false,
    accessories: [],
    petId: pet._id 
  });

  const [errors, setErrors] = useState({}); // ניהול שגיאות ב-UI

  useEffect(() => {
    document.body.classList.add('adoption-form-open');
    return () => {
      document.body.classList.remove('adoption-form-open');
    };
  }, []);

  const accessories = [
    { id: 'food', name: 'שק אוכל', price: 300 },
    { id: 'collar', name: 'קולר', price: 30 },
    { id: 'leash', name: 'רצועה', price: 60 },
    { id: 'harness', name: 'רתמה', price: 60 },
    { id: 'bowls', name: 'זוג קערות אוכל', price: 100 },
    { id: 'treats', name: 'חטיפים', price: 50 },
    { id: 'toys', name: 'צעצועים', price: 70 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors({ ...errors, [name]: '' }); // איפוס הודעות שגיאה בעת שינוי קלט
  };

  const handleAccessoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      accessories: checked
        ? [...prevData.accessories, value]
        : prevData.accessories.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      fullName: formData.fullName, 
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      idNumber: formData.idNumber,
      address: formData.address,
      petId: formData.petId,
      cardNumber: formData.cardNumber,
      cardExpiry: formData.cardExpiry,
      cardCVV: formData.cardCVV,
      cardHolderID: formData.cardHolderID,
      adoptionPackage: formData.adoptionPackage,
      accessories: formData.accessories,
    };

    try {
      const response = await fetch('http://localhost:5000/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('אימוץ נשמר בהצלחה!');
        onClose();
      } else {
        const errorData = await response.json();
        
        // בדיקה האם השגיאה קשורה למייל או לטלפון כפולים
        if (errorData.message.includes('Email already exists')) {
          setErrors({ ...errors, email: 'מייל זה כבר קיים במערכת.' });
        } else if (errorData.message.includes('Phone number already exists')) {
          setErrors({ ...errors, phoneNumber: 'מספר הטלפון הזה כבר קיים במערכת.' });
        } else {
          alert(`שגיאה בשליחת הטופס: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('שגיאה בשרת: ' + error.message);
    }
  };

  return (
    <div className="adoption-form-overlay">
      <div className="adoption-form-container">
        <div className="adoption-form-content">
          <h2>טופס אימוץ עבור {pet.name}</h2>
          <form onSubmit={handleSubmit}>
            <h3>פרטים אישיים</h3>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="שם מלא"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="אימייל"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>} {/* הודעת שגיאה על מייל */}
            
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="טלפון"
              pattern="[0-9]{10}" // וידוא 10 ספרות בלבד
              title="הטלפון חייב לכלול 10 ספרות"
              required
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>} {/* הודעת שגיאה על טלפון */}
            
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="כתובת"
              required
            />
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="תעודת זהות"
              pattern="^[0-9]{1,9}$" // ולידציה עבור עד 9 ספרות
              title="תעודת הזהות חייבת להיות עד 9 ספרות (מספרים בלבד)" 
              required
            />
            <h3>פרטי אשראי (עבור תשלום סל אימוץ)</h3>
            <label>
              <input
                type="checkbox"
                name="adoptionPackage"
                checked={formData.adoptionPackage}
                onChange={handleChange}
                required
              />
              סל אימוץ בסיסי (₪900) - חובה
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="מספר כרטיס אשראי"
              pattern="[0-9]{12}" // ולידציה עבור 12 ספרות בלבד
              title="מספר כרטיס האשראי חייב לכלול 12 ספרות"
              required
            />
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              placeholder="תוקף הכרטיס (MM/YY)"
              pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" // ולידציה לפורמט תאריך MM/YY
              title="התוקף חייב להיות בפורמט MM/YY"
              required
            />
            <input
              type="text"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={handleChange}
              placeholder="3 ספרות בגב הכרטיס"
              pattern="[0-9]{3}" // ולידציה עבור 3 ספרות בלבד
              title="ה-CVV חייב להיות 3 ספרות"
              required
            />
            <input
              type="text"
              name="cardHolderID"
              value={formData.cardHolderID}
              onChange={handleChange}
              placeholder="ת.ז. בעל הכרטיס"
              pattern="[0-9]{1,9}" // תז בעל הכרטיס עד 9 ספרות
              title="ת.ז. חייבת להיות עד 9 ספרות"
              required
            />

            <h3>מוצרים נלווים:</h3>
            <div className="accessories-list">
              {accessories.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    name="accessories"
                    value={item.id}
                    checked={formData.accessories.includes(item.id)}
                    onChange={handleAccessoryChange}
                  />
                  {item.name} (₪{item.price})
                </label>
              ))}
            </div>

            <div className="form-buttons">
              <button type="submit">שלח טופס</button>
              <button type="button" onClick={onClose}>סגור</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
