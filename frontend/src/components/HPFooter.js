import React from 'react';
import '../../src/assets/styles/HPFooter.css';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaGoogle } from 'react-icons/fa';
import logo from '../../src/assets/images/Pawfect-match-logo.png';
import { useGoogleLogin } from '@react-oauth/google';

const HPFooter = ({ onLogin }) => { 
    // login with google function
    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log('Login Success:', credentialResponse);
            onLogin(credentialResponse); 
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>אודות</h3>
                    <ul>
                        <li>מי אנחנו</li>
                        <li>צור קשר</li>
                        <li>תודות</li>
                        <li>תקנון</li>
                        <li>חדשות</li>
                        <li>מדיניות פרטיות</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>שאלון התאמה</h3>
                </div>
                <div className="footer-section">
                    <h3>שיתופי פעולה</h3>
                    <ul>
                        <li>עמותות וכלביות</li>
                        <li>התנדבות</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>לוח בעלי חיים אבודים SOS</h3>
                </div>
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="footer-social">
                        <a href="#youtube">
                            <FaYoutube className="social-icon" />
                        </a>
                        <a href="#twitter">
                            <FaTwitter className="social-icon" />
                        </a>
                        <a href="#instagram">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="#facebook">
                            <FaFacebook className="social-icon" />
                        </a>
                        <a href="Google" onClick={login}>
                            <FaGoogle className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Pets Adoption. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default HPFooter;
