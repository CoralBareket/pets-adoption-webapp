import React, { useState, useEffect } from 'react';
import '../../src/assets/styles/AdoptionForm.css';

const AdoptionForm = ({ pet, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    idNumber: '', // תעודת זהות של המאמץ
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardHolderID: '',
    adoptionPackage: false,
    accessories: [],
    petId: pet._id // שמירת מזהה החיה בטופס
  });

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
        console.error('Server error:', errorData); 
        alert(`שגיאה בשליחת הטופס: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('שגיאה בשרת');
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
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="טלפון"
              required
            />
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
              required
            />
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              placeholder="תוקף הכרטיס (MM/YY)"
              required
            />
            <input
              type="text"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={handleChange}
              placeholder="3 ספרות בגב הכרטיס"
              required
            />
            <input
              type="text"
              name="cardHolderID"
              value={formData.cardHolderID}
              onChange={handleChange}
              placeholder="ת.ז. בעל הכרטיס"
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