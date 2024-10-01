const express = require('express');
const router = express.Router();
const {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    matchPet,
    searchPets // Add this new controller method
} = require('../controllers/petController');

// Public routes
router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/match', matchPet);
router.post('/search', searchPets); // Add this new route

// Admin routes
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;