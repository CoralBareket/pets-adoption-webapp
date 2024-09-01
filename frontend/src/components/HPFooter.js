import React from 'react';
import '../../src/assets/styles/HPFooter.css'; // Make sure this path is correct relative to your project structure
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const HPFooter = () => {
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
                    <h3>שיתופי פעולה</h3>
                    <ul>
                        <li>עמותות וכלביות</li>
                        <li>התנדבות</li>
                    </ul>
                </div>
                <div className="footer-social">
                    <a href="#facebook">
                        <FaFacebook className="social-icon" />
                    </a>
                    <a href="#instagram">
                        <FaInstagram className="social-icon" />
                    </a>
                    <a href="#twitter">
                        <FaTwitter className="social-icon" />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Pets Adoption. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default HPFooter;
