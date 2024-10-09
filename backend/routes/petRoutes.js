const express = require('express');
const router = express.Router();
const {
    getPets,
    getPetById,
    createPet,
    deletePet,
    matchPet,
    searchPets 
} = require('../controllers/petController');

// Public routes
router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/match', matchPet);
router.post('/search', searchPets); 

// Admin routes
router.post('/', createPet);
router.delete('/:id', deletePet);

module.exports = router;
