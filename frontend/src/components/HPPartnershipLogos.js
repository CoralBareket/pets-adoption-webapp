import React from 'react';
import '../../src/assets/styles/HPPartnershipLogos.css';

const PartnershipLogos = () => {
    const logos = [
        "/path-to-logo1",
        "/path-to-logo2",
        "/path-to-logo3",
        "/path-to-logo4",
    ];

    return (
        <section className="partnership-logos">
            <h2>שיתופי פעולה וחברים שלנו למסע</h2>
            <div className="logos-grid">
                {logos.map((logo, index) => (
                    <div className="logo-card" key={index}>
                        <img src={logo} alt={`Partner ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PartnershipLogos;
