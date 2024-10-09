const User = require('../models/userModel');
const Adoption = require('../models/adoptionModel');
const Pet = require('../models/PetModel');
const { createUserIfNotExists } = require('./userController');
const asyncHandler = require('express-async-handler');


const createAdoption = async (adoptionData) => {
    const { idNumber, fullName, phoneNumber, email, address, petId, cardNumber, cardExpiry, cardCVV, cardHolderID, adoptionPackage, accessories } = adoptionData;

    try {
        // יצירת יוזר אם לא קיים, או עדכון אם קיים
        console.log('1. Trying to find or create a user with ID number:', idNumber);
        const user = await createUserIfNotExists(idNumber, fullName, phoneNumber, email, address);
        
        if (!user) {
            console.log('2. Failed to create or find user.');
            throw new Error('User creation or lookup failed');
        }

        console.log('3. User found or created:', user);

        // בדיקת החיה
        console.log('4. Finding pet with ID:', petId);
        const pet = await Pet.findById(petId);
        if (!pet) {
            console.log('5. Pet not found with ID:', petId);
            throw new Error('Pet not found');
        }

        console.log('6. Pet found:', pet);

        // יצירת האימוץ וקישורו ליוזר
        const adoption = new Adoption({
            idNumber,  // ודא שאנחנו מעבירים את תעודת הזהות
            userId: user._id,  // קישור האימוץ ליוזר הקיים או החדש
            petId,     
            address,  
            cardNumber,
            cardExpiry,
            cardCVV,
            cardHolderID,
            adoptionPackage,
            accessories,
            adoptionDate: Date.now()
        });

        console.log('7. Saving adoption...');
        await adoption.save();

        console.log('8. Adoption saved successfully:', adoption);

        // עדכון סטטוס החיה
        pet.status = 'אומץ';  
        await pet.save(); 

        console.log('9. Pet status updated to adopted:', pet);

        return adoption;

    } catch (error) {
        if (error.code === 11000) { 
            console.error('Duplicate key error:', error);
            throw new Error('Email already exists in the system.');
        }
        console.error('Error in createAdoption function:', error);
        throw new Error(error.message);
    }
};


const getAdoptionsOverTime = asyncHandler(async (req, res) => {
    try {
        
        const today = new Date();
        
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        // Query adoptions made within the last 7 days 
        const adoptions = await Adoption.aggregate([
            {
                $match: {
                    adoptionDate: { $gte: lastWeek } 
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$adoptionDate" } }, // Group by day
                    count: { $sum: 1 } // Count the adoptions per day
                }
            },
            { $sort: { _id: 1 } } // Sort by date ascending
        ]);

        res.json(adoptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching adoptions data over time' });
    }
});


const getAdoptionsByAnimalType = async (req, res) => {
    try {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        //  join בין טבלת האימוצים לטבלת החיות
        const adoptions = await Adoption.aggregate([
            { $match: { adoptionDate: { $gte: lastMonth } } }, // אימוצים מהחודש האחרון
            {
                $lookup: {
                    from: 'pets', 
                    localField: 'petId', 
                    foreignField: '_id', 
                    as: 'pet' 
                }
            },
            { $unwind: '$pet' }, 
            { 
                $group: { 
                    _id: "$pet.animalType", 
                    count: { $sum: 1 } 
                }
            }
        ]);

        res.json(adoptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching adoptions by animal type' });
    }
};



module.exports = { 
    createAdoption,
    getAdoptionsOverTime,
    getAdoptionsByAnimalType
};
