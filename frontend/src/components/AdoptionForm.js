import React, { useState, useEffect } from 'react';
import '../../src/assets/styles/AdoptionForm.css';

const AdoptionForm = ({ pet, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardHolderID: '',
    adoptionPackage: false,
    accessories: []
  });

  useEffect(() => {
    // הוספת class לגוף המסמך בעת פתיחת הטופס
    document.body.classList.add('adoption-form-open');

    // הסרת class מגוף המסמך בעת סגירת הטופס
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.adoptionPackage) {
      alert('יש לבחור בסל האימוץ הבסיסי כדי להמשיך');
      return;
    }
    console.log('Form submitted:', formData);
    alert('טופס האימוץ נשלח בהצלחה!');
    onClose();
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
              name="name"
              value={formData.name}
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
              name="phone"
              value={formData.phone}
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