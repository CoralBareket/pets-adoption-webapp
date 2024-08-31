const Dog = require('../models/Dog');

// @desc    Get all dogs
// @route   GET /api/dogs
// @access  Public
exports.getDogs = async (req, res) => {
    try {
        const dogs = await Dog.find({});
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single dog
// @route   GET /api/dogs/:id
// @access  Public
exports.getDogById = async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json(dog);
    } catch (error) {
        console.error("Error fetching dog by ID:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc    Create a new dog
// @route   POST /api/dogs
// @access  Admin
exports.createDog = async (req, res) => {
    try {
        const { name, age, breed, description, imageUrl } = req.body;
        const dog = new Dog({ name, age, breed, description, imageUrl });
        const savedDog = await dog.save();
        res.status(201).json(savedDog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a dog
// @route   PUT /api/dogs/:id
// @access  Admin
exports.updateDog = async (req, res) => {
    try {
        const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json(updatedDog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a dog
// @route   DELETE /api/dogs/:id
// @access  Admin
exports.deleteDog = async (req, res) => {
    try {
        const deletedDog = await Dog.findByIdAndDelete(req.params.id);
        if (!deletedDog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json({ message: 'Dog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
