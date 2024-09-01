import React, { useState } from 'react';
import '../../src/assets/styles/HPHeader.css';
import logo from '../../src/assets/images/logo.png';
import familyImage from '../../src/assets/images/my-family.png';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <>
            <nav className="navbar">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                    <div className="footer-logo-title">Pawfect match</div>
                </div>
                <ul className="navbar-menu">
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
                    <li>שאלון התאמה</li>
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
                    <li>הצרכניה</li>
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
                    מלאו את שאלון ההתאמה והצטרפו אל המשפחות המאושרות שכבר אימצו </p>
                </div>
            </div>
        </>
    );
};

export default Header;
