const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


// Function to create a new user if they don't already exist based on ID number
const createUserIfNotExists = async (idNumber, fullName, phoneNumber, email, address) => {
    try {
      console.log('Checking if user exists with ID number:', idNumber);
      let user = await User.findOne({ idNumber });
  
      if (user) {
        console.log('User already exists, updating details...');
  
        // בדיקת כפילות מייל אצל יוזרים אחרים (לא אצל היוזר הנוכחי)
        if (email && email !== user.email) {
          const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
          if (emailExists) {
            const error = new Error('Email already exists');
            error.statusCode = 400;
            throw error;
          }
        }
  
        // בדיקת כפילות טלפון אצל יוזרים אחרים (לא אצל היוזר הנוכחי)
        if (phoneNumber && phoneNumber !== user.phoneNumber) {
          const phoneExists = await User.findOne({ phoneNumber, _id: { $ne: user._id } });
          if (phoneExists) {
            const error = new Error('Phone number already exists');
            error.statusCode = 400;
            throw error;
          }
        }
  
        // עדכון רק אם הערכים שונים מהערכים הקיימים
        if (fullName !== user.fullName) {
          user.fullName = fullName;
        }
        if (phoneNumber !== user.phoneNumber) {
          user.phoneNumber = phoneNumber;
        }
        if (email !== user.email) {
          user.email = email;
        }
        if (address !== user.address) {
          user.address = address;
        }
  
        await user.save();
        console.log('User details updated successfully:', user);
      } else {
        console.log('User does not exist, creating new user...');
        user = new User({
          idNumber,
          fullName,
          phoneNumber,
          email,
          address
        });
  
        await user.save();
        console.log('New user created successfully:', user);
      }
  
      return user;
    } catch (error) {
      if (error.code === 11000) {
        if (error.keyPattern && error.keyPattern.email) {
          const customError = new Error('Email already exists');
          customError.statusCode = 400;
          throw customError;
        }
        if (error.keyPattern && error.keyPattern.phoneNumber) {
          const customError = new Error('Phone number already exists');
          customError.statusCode = 400;
          throw customError;
        }
      }
  
      console.error('Error in createUserIfNotExists function:', error);
      throw error;
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
            fullName: user.fullName, 
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
