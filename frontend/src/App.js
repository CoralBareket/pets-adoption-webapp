import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import MatchingQuiz from './pages/MatchingQuiz';
import ResultsPage from './pages/ResultsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pets" element={<PetsPage />} />
                <Route path="/matching-quiz" element={<MatchingQuiz />} />
                <Route path="/results" element={<ResultsPage />} />
                {/* Other routes here */}
                <Route path="*" element={<HomePage />} /> {/* Fallback Route */}
            </Routes>
        </Router>
    );
}

export default App;