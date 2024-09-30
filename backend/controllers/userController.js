const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// פונקציה שמטפלת ביצירת יוזר חדש אם לא קיים לפי תעודת זהות
const createUserIfNotExists = async (idNumber, fullName, phoneNumber, email, address) => {
  try {
    // בדיקה אם יש יוזר קיים עם תעודת הזהות
    let user = await User.findOne({ idNumber });

    if (user) {
      // אם היוזר קיים, נעדכן את הפרטים
      console.log('User already exists, updating details...');
      user.fullName = fullName || user.fullName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.email = email || user.email;
      user.address = address || user.address;

      // שמירת השינויים
      await user.save();
      console.log('User details updated successfully:', user);
    } else {
      // אם היוזר לא קיים, ניצור יוזר חדש
      console.log('Creating a new user...');
      user = new User({
        idNumber,
        fullName,
        phoneNumber,
        email,
        address
      });

      // שמירת היוזר החדש
      await user.save();
      console.log('User created successfully:', user);
    }

    return user;
  } catch (error) {
    console.error('Error in createUserIfNotExists function:', error);
    throw new Error('Failed to create or update user');
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
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

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { idNumber, phoneNumber } = req.body;

    const user = await User.findOne({ idNumber });

    if (user && user.phoneNumber === phoneNumber) {
        res.json({
            _id: user._id,
            idNumber: user.idNumber,
            phoneNumber: user.phoneNumber,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid ID number or phone number');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            idNumber: user.idNumber,
            phoneNumber: user.phoneNumber,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
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
    createUserIfNotExists
};
