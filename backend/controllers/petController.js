const Pet = require('../models/PetModel');


// @desc    Get all pets
// @route   GET /api/pets
// @access  Public
const getPets = async (req, res) => {
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


// @desc    Get a single pet by ID
// @route   GET /api/pets/:id
// @access  Public
const getPetById = async (req, res) => {
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

// פונקציה פנימית לשליפת חיה לפי מזהה
const getPetByIdInternal = async (petId) => {
    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new Error('Pet not found');
        }
        return pet;
    } catch (error) {
        console.error('Error fetching pet by ID:', error);
        throw error;
    }
};

// @desc    Create a new pet
// @route   POST /api/pets
// @access  Admin
const createPet = async (req, res) => {
    try {
        const { name, age, gender, breed, description, imageUrl } = req.body;
        const pet = new Pet({ name, age, gender, breed, description, imageUrl });
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(400).json({ message: error.message });
    }
};

/*animalType
status
location
size
activity*/

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Admin
const updatePet = async (req, res) => {
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

// @desc    Delete a Pet
// @route   DELETE /api/pets/:id
// @access  Admin
const deletePet = async (req, res) => {
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

// @desc    Match pet to user based on preferences
// @route   POST /api/pets/match
// @access  Public
const matchPet = async (req, res) => {
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
        query.animalType = { $in: ['cat'] }; // Cats are suitable for long hours away
    }

    // Filter based on activity level
    if (activityLevel === 'active') {
        query.size = 'גדול'; // Active people are suitable for large dogs
    } else if (activityLevel === 'moderate') {
        query.size = { $in: ['בינוני', 'קטן'] }; // Medium or small pets for moderate activity
    } else {
        query.$or = [
            { size: 'קטן' }, // Small pets
            { animalType: 'cat' },
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

const searchPets = async (req, res) => {
    try {
        const { animalType, location, age } = req.body;

        // Initialize match stage for aggregation
        let matchStage = {};

        // Add animalType to match stage if provided
        if (animalType) {
            matchStage.animalType = { $regex: new RegExp(`^${animalType}$`, 'i') };
        }

        // Add location to match stage if provided
        if (location) {
            matchStage.location = { $regex: new RegExp(location, 'i') };
        }

        // Handle age groups
        if (age) {
            switch (age) {
                case 'puppy':
                    matchStage.age = { $regex: /^([0-9]|1[01]) חודשים$/ };
                    break;
                case 'young':
                    matchStage.age = { $in: ["שנה", "שנתיים"] };
                    break;
                case 'adult':
                    matchStage.age = { $regex: /^([3-7]) שנים$/ };
                    break;
                case 'senior':
                    matchStage.age = { $regex: /^([8-9]|1[0-9]|20) שנים$/ };
                    break;
            }
        }

        // Perform the aggregation query
        const results = await Pet.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        animalType: "$animalType",
                        location: "$location",
                        ageGroup: {
                            $switch: {
                                branches: [
                                    { case: { $regexMatch: { input: "$age", regex: /^([0-9]|1[01]) חודשים$/ } }, then: "puppy" },
                                    { case: { $in: ["$age", ["שנה", "שנתיים"]] }, then: "young" },
                                    { case: { $regexMatch: { input: "$age", regex: /^([3-7]) שנים$/ } }, then: "adult" },
                                    { case: { $regexMatch: { input: "$age", regex: /^([8-9]|1[0-9]|20) שנים$/ } }, then: "senior" }
                                ],
                                default: "unknown"
                            }
                        }
                    },
                    count: { $sum: 1 },
                    pets: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    animalType: "$_id.animalType",
                    location: "$_id.location",
                    ageGroup: "$_id.ageGroup",
                    count: 1,
                    pets: 1
                }
            }
        ]);

        // Send the response
        res.json(results);
    } catch (error) {
        console.error('Error in searchPets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getPets,
    getPetById,
    getPetByIdInternal,
    createPet,
    updatePet,
    deletePet,
    matchPet,
    searchPets
};