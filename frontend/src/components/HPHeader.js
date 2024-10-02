import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../src/assets/styles/HPHeader.css';
import logo from '../../src/assets/images/Pawfect-match-logo.png';
import familyImage from '../../src/assets/images/my-family.png';
import LoginModal from './LoginModal';

const HPHeader = ({ onLogin, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const navigate = useNavigate();

    const handleLogin = (user) => {
        setLoggedInUser(user);
        onLogin(user);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        onLogout();
        navigate('/');
    };

    const handlePersonalArea = () => {
        navigate('/profile');
    };

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        }
    }, [loggedInUser]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {loggedInUser && (
                <div className="top-bar">
                    <div className="user-menu">
                        <button className="logout-button" onClick={handleLogout}>התנתקות</button>
                        <button className="personal-area-button" onClick={handlePersonalArea}>אזור אישי</button>
                        <span className="greeting">שלום, {loggedInUser.fullName}</span>
                    </div>
                </div>
            )}
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        ☰
                    </div>
                    <div className="header-logo">
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo-clickable"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/about">אודות</Link>
                    </li>
                    <li className="pulse-animation">
                        <Link to="/matching-quiz">שאלון התאמה</Link>
                    </li>
                    <li>
                        <Link to="/collaborations">שיתופי פעולה</Link>
                    </li>
                    <li>
                        <Link to="/lost-pets">
                            לוח בעלי חיים אבודים
                            <span className="SOS"> SOS </span>
                        </Link>
                    </li>
                </ul>
                {!loggedInUser && (
                    <div className="login-button">
                        <button onClick={() => setIsLoginModalOpen(true)}>
                            <svg className="icon-person" viewBox="0 0 24 24">
                                <path d="M20 22v-2a8 10 0 0 0-15 0v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                <line x1="5" y1="22" x2="20" y2="22"></line>
                            </svg>
                            <span className="login-text">
                                <span>אזור אישי</span>
                                <span>התחברות/הרשמה</span>
                            </span>
                        </button>
                    </div>
                )}
            </nav>
            <div className="header">
                <div className="header-image">
                    <img src={familyImage} alt="My-Family" />
                </div>
                <div className="header-content">
                    <h1>לאמץ בלי להתאמץ</h1>
                    <p>
                        אלפי חברים על ארבע מחכים שתאמצו אותם והאלגוריתם שלנו יעזור לכם למצוא את החבר המושלם עבורכם
                        <br />
                        מלאו את שאלון ההתאמה והצטרפו אל המשפחות המאושרות שכבר אימצו
                    </p>
                    <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
                </div>
            </div>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </>
    );
};

export default HPHeader;