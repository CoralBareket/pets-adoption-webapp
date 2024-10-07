import React, { useState } from 'react';
import axios from 'axios';
import '../../src/assets/styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [idNumber, setIdNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();

        // אם השדות מכילים "admin", התחברות מנהל
        if (idNumber === 'admin' && phoneNumber === 'admin') {
            const adminUser = { fullName: 'מנהל', isAdmin: true };
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
            onClose();
            return;
        }

        // התחברות הרגילה
        try {
            const response = await axios.post('/api/users/login', { idNumber, phoneNumber });
            if (response.data && response.data.fullName) {
                localStorage.setItem('loggedInUser', JSON.stringify(response.data));
                onLogin(response.data);
                onClose();
            } else {
                setError('ההתחברות נכשלה. אין שם משתמש.');
            }
        } catch (error) {
            setError('ההתחברות נכשלה. אנא בדוק את מספר הזהות ומספר הטלפון הנייד שהזנת');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">X</button>
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>התחברות</h2>
                    <div className="form-group">
                        <label>:מספר ת.ז</label>
                        <input
                            type="text"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>:מספר טלפון נייד</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="modal-login-button">התחבר</button>
                </form>
                <button onClick={onClose} className="close-button">X</button>
            </div>
        </div>
    );
};

export default LoginModal;
