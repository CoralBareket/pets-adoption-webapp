const User = require('../models/userModel');
const Adoption = require('../models/adoptionModel');
const Pet = require('../models/PetModel');
const { createUserIfNotExists } = require('./userController');

const createAdoption = async (adoptionData) => {
    const { idNumber, fullName, phoneNumber, email, address, petId, cardNumber, cardExpiry, cardCVV, cardHolderID, adoptionPackage, accessories } = adoptionData;

    try {
        // שלב 1: יצירת יוזר אם לא קיים
        console.log('1. Trying to find or create a user with ID number:', idNumber);
        const user = await createUserIfNotExists(idNumber, fullName, phoneNumber, email, address);
        
        if (!user) {
            console.log('2. Failed to create or find user.');
            throw new Error('User creation or lookup failed');
        }

        console.log('3. User found or created:', user);

        // שלב 2: בדיקת החיה
        console.log('4. Finding pet with ID:', petId);
        const pet = await Pet.findById(petId);
        if (!pet) {
            console.log('5. Pet not found with ID:', petId);
            throw new Error('Pet not found');
        }

        console.log('6. Pet found:', pet);

        // שלב 3: יצירת האימוץ עם מזהה היוזר שנשמר
        const adoption = new Adoption({
            idNumber,  // שמירת ת"ז של המאמץ
            petId,     // מקשר את האימוץ לחיה
            address,   // כתובת המשתמש
            cardNumber,
            cardExpiry,
            cardCVV,
            cardHolderID,
            adoptionPackage,
            accessories
        });

        console.log('7. Saving adoption...');
        await adoption.save();

        console.log('8. Adoption saved successfully:', adoption);
        return adoption;

    } catch (error) {
        console.error('Error in createAdoption function:', error);
        throw new Error(error.message);
    }
};


module.exports = { createAdoption };
