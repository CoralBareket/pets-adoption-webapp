const express = require('express');
const router = express.Router();
const {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    matchPet
} = require('../controllers/petController');

// Public routes
router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/match', matchPet);

// Admin routes
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);
router.post('/match', matchPet);
module.exports = router;
