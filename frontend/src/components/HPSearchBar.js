import React from 'react';
import '../../src/assets/styles/HPSearchBar.css';

const SearchBar = () => {
    return (
        <section className="search-bar">
            <h2>מצאו את השידוך המושלם</h2>
            <div className="search-form-container">
                <form className="search-form">
                    <div className="form-group">
                        <label htmlFor="breed">אני רוצה לאמץ</label>
                        <select id="breed">
                            <option value="" disabled selected hidden>כלב</option>
                            <option value="dog">כלב</option>
                            <option value="cat">חתול</option>
                            <option value="other">אחר</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">באזור</label>
                        <select id="location">
                            <option value="" disabled selected hidden>בחר אזור</option>
                            <option value="north">צפון</option>
                            <option value="center">מרכז</option>
                            <option value="south">דרום</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">בגיל</label>
                        <select id="age">
                            <option value="" disabled selected hidden>בחר גיל</option>
                            <option value="puppy">גור</option>
                            <option value="young">צעיר</option>
                            <option value="adult">בוגר</option>
                            <option value="senior">מבוגר</option>
                        </select>
                    </div>
                </form>
                <button type="submit" className="search-btn">חיפוש</button>
            </div>
            <div className="search-options">
                <button>חיפוש מתקדם</button>
                <button>חיפוש לפי תמונה</button>
                <button>נקה חיפוש</button>
            </div>
        </section>
    );
};

export default SearchBar;
