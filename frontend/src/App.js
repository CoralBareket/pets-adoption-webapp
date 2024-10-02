import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import MatchingQuiz from './pages/MatchingQuiz';
import QuizResultsPage from './pages/QuizResultsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import UserProfile from './pages/UserProfile';
import SosPage from './pages/SosPage';


function App() {
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogin = (user) => {
        setLoggedInUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        console.log("Logged in user:", user);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
    };

    useEffect(() => {
        // Can add any additional side effects here if needed
    }, [loggedInUser]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage onLogin={handleLogin} onLogout={handleLogout} />} />
                <Route path="/pets" element={<PetsPage isAdmin={loggedInUser?.admin} />} />
                <Route path="/matching-quiz" element={<MatchingQuiz />} />
                <Route path="/results" element={<QuizResultsPage />} />
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/lost-pets" element={<SosPage />} />
                <Route path="*"  element={<HomePage onLogin={handleLogin} onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
}

export default App;