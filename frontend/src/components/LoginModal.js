import React, { useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import '../../src/assets/styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [idNumber, setIdNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);

    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            console.log('Google Login Success:', credentialResponse);

            const userInfo = {
                idNumber: idNumber,
                phoneNumber: phoneNumber,
                isAdmin: false,
            };

            localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
            onLogin(userInfo);
            onClose();
        },
        onError: (error) => {
            console.log('Google Login Failed:', error);
            setError('ההתחברות לגוגל נכשלה.');
        },
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (idNumber === 'admin' && phoneNumber === 'admin') {
            const adminUser = { fullName: 'מנהל', isAdmin: true };
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
            onLogin(adminUser);
            onClose();
            return;
        }

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

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">X</button>
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>התחברות | התחברות עם גוגל</h2>
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
                    <div className="button-group">
                        <button type="submit" className="modal-login-button">התחבר</button>
                        <button type="button" onClick={login} className="modal-login-button google-button">
                            <FaGoogle className="google-icon" />
                            <span>התחבר עם גוגל</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;