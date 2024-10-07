const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


// Function to create a new user if they don't already exist based on ID number
const createUserIfNotExists = async (idNumber, fullName, phoneNumber, email, address) => {
  try {
    let user = await User.findOne({ idNumber });

    if (user) {
      // If the user exists, update the details
      console.log('User already exists, updating details...');
      user.fullName = fullName || user.fullName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.email = email || user.email;
      user.address = address || user.address;

      // Save updated user details
      await user.save();
      console.log('User details updated successfully:', user);
    } else {
      // If the user does not exist, create a new one
      console.log('Creating a new user...');
      user = new User({
        idNumber,
        fullName,
        phoneNumber,
        email,
        address
      });

      // Save the new user
      await user.save();
      console.log('User created successfully:', user);
    }

    return user;
  } catch (error) {
    console.error('Error in createUserIfNotExists function:', error);
    throw new Error('Failed to create or update user');
  }
};

// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { idNumber, fullName, phoneNumber, email, address } = req.body;

    const userExists = await User.findOne({ idNumber });

    if (userExists) {
        res.status(400);
        throw new Error('User with this ID number already exists');
    }

    const user = await User.create({
        idNumber,
        fullName,
        phoneNumber,
        email,
        address,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            idNumber: user.idNumber,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { idNumber, phoneNumber } = req.body;

    const user = await User.findOne({ idNumber });

    if (user && user.phoneNumber === phoneNumber) {
        res.json({
            _id: user._id,
            idNumber: user.idNumber,
            fullName: user.fullName, // Ensure full name is sent
            phoneNumber: user.phoneNumber,
            email: user.email,
            admin: user.admin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid ID number or phone number');
    }
});

// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('adoptionHistory.pet');

    if (user) {
        res.json({
            _id: user._id,
            idNumber: user.idNumber,
            phoneNumber: user.phoneNumber,
            email: user.email,
            adoptionHistory: user.adoptionHistory, // Including adoption history
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.idNumber = req.body.idNumber || user.idNumber;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            idNumber: updatedUser.idNumber,
            phoneNumber: updatedUser.phoneNumber,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    createUserIfNotExists,
};
