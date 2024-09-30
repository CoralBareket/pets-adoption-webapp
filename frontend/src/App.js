import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import MatchingQuiz from './pages/MatchingQuiz';
import ResultsPage from './pages/ResultsPage';

function App() {

    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // פונקציה שמבצעת התחברות ושמירת פרטי המשתמש
    const handleLogin = (user) => {
        setLoggedInUser(user); 
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        console.log("Logged in user:", user); 
    };

    // פונקציה להתנתקות מהמשתמש
    const handleLogout = () => {
        setLoggedInUser(null); 
        localStorage.removeItem('loggedInUser'); 
    };

    useEffect(() => {
        
    }, [loggedInUser]);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={<HomePage onLogin={handleLogin} onLogout={handleLogout} />} 
                />
                <Route 
                    path="/pets" 
                    element={<PetsPage isAdmin={loggedInUser?.admin} />} 
                />
                <Route path="/matching-quiz" element={<MatchingQuiz />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route 
                    path="*" 
                    element={<HomePage onLogin={handleLogin} onLogout={handleLogout} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
