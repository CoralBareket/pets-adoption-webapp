const Pet = require('../models/Pet');

// @desc    Get all pets
// @route   GET /api/pets
// @access  Public
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

// @desc    Get a single pet
// @route   GET /api/pets/:id
// @access  Public
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        console.error("Error fetching pet by ID:", error);  // Log the error for debugging
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a new pet
// @route   POST /api/pets
// @access  Admin
exports.createPet = async (req, res) => {
    try {
        const { name, age, breed, description, imageUrl } = req.body;
        const pet = new Pet({ name, age, breed, description, imageUrl });
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error("Error creating pet:", error);  // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Admin
exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(updatedPet);
    } catch (error) {
        console.error("Error updating pet:", error);  // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a Pet
// @route   DELETE /api/pets/:id
// @access  Admin
exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json({ message: 'Pet deleted' });
    } catch (error) {
        console.error("Error deleting pet:", error);  // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};
