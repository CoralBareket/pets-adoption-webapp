const mongoose = require('mongoose');
const Pet = require('../models/Pet');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/petAdoption', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Define your initial pets
const pets = [
    {
        name: "גבר",
        age: 3,
        breed: "German Shepherd",
        description: "Friendly and loyal dog, perfect for families.",
        isAdopted: false,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkumzyCRmPS0Jbc0PeJWxZT5gAamvIrFCKDg&s"
    },
    {
        name: "בילי",
        age: 2,
        breed: "Labrador Retriever",
        description: "Energetic and playful, great with kids.",
        isAdopted: false,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s"
    },
    {
        name: "ג'וני",
        age: 4,
        breed: "Beagle",
        description: "Loves to sniff around, perfect companion for outdoor activities.",
        isAdopted: false,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CZrl0wGbsEb-7TwCIUnIYQUMHSHCD22DzA&s"
    },
    // Add more pets as needed
];

// Insert the pets into the database
Pet.insertMany(pets)
    .then(res => {
        console.log('Pets inserted:', res);
        mongoose.connection.close(); // Close the connection after the operation is done
    })
    .catch(err => {
        console.log('Failed to insert pets', err);
        mongoose.connection.close(); // Ensure the connection is closed even if there's an error
    });
