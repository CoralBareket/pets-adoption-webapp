import React from 'react';
import '../../src/assets/styles/HPFeaturedPets.css';

const FeaturedPets = () => {
    const pets = [
        { name: "גבר", description: "בלה, בלה, בלה... להוסיף תיאור בהמשך", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkumzyCRmPS0Jbc0PeJWxZT5gAamvIrFCKDg&s" },
        { name: "בילי", description: "בלה, בלה, בלה... להוסיף תיאור בהמשך", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s" },
        { name: "ג'וני", description: "בלה, בלה, בלה... להוסיף תיאור בהמשך", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CZrl0wGbsEb-7TwCIUnIYQUMHSHCD22DzA&s" },
    ];

    return (
        <section className="featured-pets">
            <h2>בעלי חיים לאימוץ</h2>
            <div className="pets-grid">
                {pets.map((pet, index) => (
                    <div className="pet-card" key={index}>
                        <img src={pet.image} alt={pet.name} />
                        <h3>{pet.name}</h3>
                        <p>{pet.description}</p>
                        <button>לפרטים</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedPets;
