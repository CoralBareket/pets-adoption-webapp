const express = require('express');
const {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/petController');
const router = express.Router();

// Public routes
router.get('/', getPets);
router.get('/:id', getPetById);

// Admin routes
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
