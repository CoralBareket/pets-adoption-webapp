import React from 'react';
import HPHeader from '../components/HPHeader';
import HPSearchBar from '../components/HPSearchBar';
import HPFeaturedPets from '../components/HPFeaturedPets';
import HPPartnershipLogos from '../components/HPPartnershipLogos';
import HPFooter from '../components/HPFooter';
import LoginWithGoogle from '../components/LoginWithGoogle';

const HomePage = ({ onLogin, onLogout }) => {
    return (
        <div className="homepage">
            <HPHeader onLogin={onLogin} onLogout={onLogout} />
            <HPSearchBar />
            <HPFeaturedPets />
            <HPPartnershipLogos />
            <HPFooter />
            <LoginWithGoogle onLogin={onLogin} />
        </div>
    );
};

export default HomePage;
