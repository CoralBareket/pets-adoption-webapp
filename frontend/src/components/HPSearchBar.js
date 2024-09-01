import React from 'react';
import '../../src/assets/styles/HPSearchBar.css';

const SearchBar = () => {
    return (
        <section className="search-bar">
            <h2>מצאו את השידוך המושלם</h2>
            <form className="search-form">
                <select>
                    <option>בחר גזע</option>
                </select>
                <select>
                    <option>בחר אזור</option>
                </select>
                <select>
                    <option>בחר גיל</option>
                </select>
                <button type="submit">חיפוש</button>
            </form>
            <div className="search-options">
                <button>חיפוש מתקדם</button>
                <button>חיפוש לפי תמונה</button>
                <button>נקה חיפוש</button>
            </div>
        </section>
    );
};

export default SearchBar;
