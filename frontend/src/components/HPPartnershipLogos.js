import React from 'react';
import '../../src/assets/styles/HPPartnershipLogos.css';

// Dynamically require all images in the src/assets/images/logos directory
const importAll = (requireContext) =>
  requireContext.keys().map(requireContext);

// This will give you an array of all images
const logos = importAll(require.context('../../src/assets/images/logos', false, /\.(png|jpe?g|svg)$/));

// Define an array of objects where each object has an image and its corresponding link
const logoData = [
    { image: logos[0], link: 'https://www.sospets.co.il/?gad_source=1&gclid=CjwKCAjwxNW2BhAkEiwA24Cm9H9Nc-VPFvCQ_SFhGgdXkLcl-G7o3JHl-gg9nU9s93V8jAsr0kGxPBoCNCIQAvD_BwE' },
    { image: logos[1], link: 'https://safehaven4donkeys.co.il/' },
    { image: logos[2], link: 'https://www.facebook.com/klavimleimutz/' },
    { image: logos[3], link: 'https://www.facebook.com/eilatanimals/?locale=he_IL' },
    { image: logos[4], link: 'https://www.beer7la.com/' },
    { image: logos[5], link: 'https://benozeri.co.il/' },
    { image: logos[6], link: 'https://herzelialovesanimals.org/' },
    { image: logos[7], link: 'https://www.spca.org.il/volenteer?gad_source=1&gclid=CjwKCAjwxNW2BhAkEiwA24Cm9H5w65_u5LxCs2UQqpen0o4RxRw858hfSvG1k_kuUcuMRsbsfA8nURoCSEQQAvD_BwE' },
    { image: logos[8], link: 'https://www.letlive.org.il/' },
];

const PartnershipLogos = () => {
    return (
        <section className="partnership-logos">
            <h2>שיתופי פעולה וחברים שלנו למסע</h2>
            <div className="logos-grid">
                {logoData.concat(logoData).map((logo, index) => (
                    <div className="logo-card" key={index}>
                        <a href={logo.link} target="_blank" rel="noopener noreferrer">
                            <img src={logo.image} alt={`Partner ${index + 1}`} />
                            <div className="card-text">לעמוד העמותה</div> {/* Text element */}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PartnershipLogos;
