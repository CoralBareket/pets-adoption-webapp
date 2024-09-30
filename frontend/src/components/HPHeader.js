import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/styles/HPHeader.css';
import logo from '../../src/assets/images/Pawfect-match-logo.png';
import familyImage from '../../src/assets/images/my-family.png';
import LoginModal from './LoginModal';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const handleLogin = (userData) => {
        // Handle the login process here
        console.log('User logged in:', userData);
        // You might want to update the app state or context with the user data
    };

    return (
        <>
            <nav className="navbar">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="navbar-menu">
                    <li className="login-button">
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
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}
                        className={activeDropdown === 0 ? 'active' : ''}
                    >
                        אודות
                        <ul className="dropdown-menu">
                            <li>מי אנחנו</li>
                            <li>צור קשר</li>
                            <li>תודות</li>
                            <li>תקנון</li>
                            <li>מדיניות פרטיות</li>
                        </ul>
                    </li>
                    <li className="pulse-animation">
                        <Link to="/matching-quiz">שאלון התאמה</Link>
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                        className={activeDropdown === 1 ? 'active' : ''}
                    >
                        שיתופי פעולה
                        <ul className="dropdown-menu">
                            <li>עמותות וכלביות</li>
                            <li>התנדבות</li>
                        </ul>
                    </li>
                    <li>
                        <span>לוח בעלי חיים אבודים</span>
                        <span className="SOS"> SOS </span>
                    </li>
                </ul>
            </nav>
            <div className="header">
                <div className="header-image">
                    <img src={familyImage} alt="My-Family" />
                </div>
                <div className="header-content">
                    <h1>לאמץ בלי להתאמץ</h1>
                    <p>אלפי חברים על ארבע מחכים שתאמצו אותם והאלגוריתם שלנו יעזור לכם למצוא את החבר המושלם עבורכם
                        <br />
                        מלאו את שאלון ההתאמה והצטרפו אל המשפחות המאושרות שכבר אימצו 
                        <Link to="/pets" className="view-all-link">צפה בכל החיות לאימוץ</Link>
                        </p>
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

export default Header;
