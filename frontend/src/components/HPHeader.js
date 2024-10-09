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
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            if (loggedInUser.isAdmin) {
                console.log("Navigating to admin dashboard");
                navigate('/admin-dashboard');
            } else {
                console.log("Navigating to user profile");
                navigate('/profile');
            }
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (dropdownName) => {
        if (isSmallScreen) {
            setOpenDropdown(prevDropdown =>
                prevDropdown === dropdownName ? null : dropdownName
            );
        }
    };

    const handleMenuItemClick = () => {
        if (isSmallScreen) {
            setIsMenuOpen(false);
            setOpenDropdown(null);
        }
    };

    // Debugging: log the loggedInUser object to verify isAdmin field
    useEffect(() => {
        console.log("Logged in user:", loggedInUser);
    }, [loggedInUser]);

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
                    <div className="header-logo">
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo-clickable"
                            onClick={() => navigate('/')}
                        />
                    </div>
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
                    <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        {isMenuOpen ? 'X' : '☰'}
                    </div>
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className={`dropdown ${openDropdown === 'about' ? 'open' : ''}`}>
                        <span onClick={() => toggleDropdown('about')}>אודות</span>
                        <div className="dropdown-content">
                            <Link to="/about/who-we-are" onClick={handleMenuItemClick}>מי אנחנו</Link>
                            <Link to="/about/contact" onClick={handleMenuItemClick}>צור קשר</Link>
                            <Link to="/about/testimonials" onClick={handleMenuItemClick}>תודות</Link>
                            <Link to="/about/regulations" onClick={handleMenuItemClick}>תקנון</Link>
                            <Link to="/about/news" onClick={handleMenuItemClick}>חדשות</Link>
                            <Link to="/about/privacy-policy" onClick={handleMenuItemClick}>מדיניות פרטיות</Link>
                        </div>
                    </li>
                    <li className="pulse-animation">
                        <Link to="/matching-quiz" onClick={handleMenuItemClick}>שאלון התאמה</Link>
                    </li>
                    <li className={`dropdown ${openDropdown === 'collaborations' ? 'open' : ''}`}>
                        <span onClick={() => toggleDropdown('collaborations')}>שיתופי פעולה</span>
                        <div className="dropdown-content">
                            <Link to="/collaborations/organizations" onClick={handleMenuItemClick}>עמותות וכלביות רשות</Link>
                            <Link to="/collaborations/donations" onClick={handleMenuItemClick}>התנדבות</Link>
                        </div>
                    </li>
                    <li>
                        <Link to="/lost-pets" onClick={handleMenuItemClick}>
                            לוח בעלי חיים אבודים
                            <span className="SOS"> SOS </span>
                        </Link>
                    </li>
                </ul>
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