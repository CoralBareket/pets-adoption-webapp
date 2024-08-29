const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

// Route to get all dogs
router.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new dog
router.post('/dogs', async (req, res) => {
    try {
        const newDog = new Dog(req.body);
        await newDog.save();
        res.status(201).json(newDog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get a dog by ID
router.get('/dogs/:id', async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json(dog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a dog by ID
router.put('/dogs/:id', async (req, res) => {
    try {
        const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json(updatedDog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a dog by ID
router.delete('/dogs/:id', async (req, res) => {
    try {
        const dog = await Dog.findByIdAndDelete(req.params.id);
        if (!dog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json({ message: 'Dog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
