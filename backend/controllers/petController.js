const Pet = require('../models/PetModel');


exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        console.log("Pets found:", JSON.stringify(pets, null, 2));
        console.log("Number of pets found:", pets.length);
        res.json(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
        console.error("Full error stack:", error.stack);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};


exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        console.error("Error fetching pet by ID:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.createPet = async (req, res) => {
    try {
        const { name, age, breed, description, imageUrl, gender, size, activity, location } = req.body; 
        const pet = new Pet({ name, age, breed, description, imageUrl, gender, size, activity, location }); 
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(updatedPet);
    } catch (error) {
        console.error("Error updating pet:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json({ message: 'Pet deleted' });
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({ message: error.message });
    }
};


exports.matchPet = async (req, res) => {
    const {
        age, familyStatus, hasYard, hoursAway, petFriendlyWork,
        housingType, previousPets, activityLevel, allergies,
        petExpectations, budget, futurePlans
    } = req.body;

    let query = {};

    // Filter based on yard, housing type, and allergies
    if (housingType === 'apartment' && hasYard === 'no') {
        query.size = { $ne: 'גדול' }; // No large pets for apartments without a yard
    }

    if (allergies === 'yes') {
        query.breed = { $in: ['שיצו', 'מלטז', 'פודל'] }; // Hypoallergenic breeds
    }

    // Filter based on hours away from home
    if (hoursAway === '10 hours at least') {
        query.breed = { $in: ['חתול', 'חתול פרסי'] }; // Cats are suitable for long hours away
    }

    // Filter based on activity level
    if (activityLevel === 'active') {
        query.size = 'גדול'; // Active people are suitable for large dogs
    } else if (activityLevel === 'moderate') {
        query.size = { $in: ['בינוני', 'קטן'] }; // Medium or small pets for moderate activity
    } else {
        query.$or = [
            { size: 'קטן' }, // Small pets
            { breed: 'פרסי חתול' }, // Persian cats are calmer
            { age: { $gte: 7 } } // Older pets (7 years or more)
        ];
    }

    console.log("Query:", query);

    try {
        const filteredPets = await Pet.find(query);
        res.json(filteredPets);
    } catch (error) {
        console.error("Error finding matching pets:", error);
        res.status(500).json({ message: error.message });
    }
};
