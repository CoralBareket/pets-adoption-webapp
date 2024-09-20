import React from 'react';
import HPHeader from '../components/HPHeader';
import HPSearchBar from '../components/HPSearchBar';
import HPFeaturedPets from '../components/HPFeaturedPets';
import HPPartnershipLogos from '../components/HPPartnershipLogos';
import HPFooter from '../components/HPFooter';

const HomePage = () => {
    return (
        <div className="homepage">
            <section></section><HPHeader />
            <HPSearchBar />
            <HPFeaturedPets />
            <HPPartnershipLogos />
            <HPFooter />
        </div>
    );
};

export default HomePage;
