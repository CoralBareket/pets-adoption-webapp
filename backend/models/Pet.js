const mongoose = require('mongoose');

// Define the schema for the Pet model
const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isAdopted: {
        type: Boolean,
        default: false
    },
    adoptionDate: {
        type: Date,
        default: null
    },
    imageUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the Pet model
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;