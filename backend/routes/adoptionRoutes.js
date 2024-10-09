const express = require('express');
const { createAdoption, getAdoptionsOverTime, getAdoptionsByAnimalType } = require('../controllers/adoptionController');
const { createUserIfNotExists } = require('../controllers/userController');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { idNumber, fullName, phoneNumber, email, address } = req.body;

    console.log('Received adoption request with data:', { idNumber, fullName, phoneNumber, email, address });

    // יצירת או איתור היוזר על בסיס ת"ז
    const user = await createUserIfNotExists(idNumber, fullName, phoneNumber, email, address);

    if (!user) {
      console.log('Failed to create or find user');
      return res.status(400).json({ message: 'User creation failed' });
    }

    console.log('User found or created:', user);

    // יצירת ושמירת האימוץ עם מזהה היוזר ו-idNumber
    const adoption = await createAdoption({
      idNumber: user.idNumber, // שימוש ב-idNumber מהמשתמש
      userId: user._id, 
      ...req.body
    }); 

    console.log('Adoption saved successfully:', adoption);
    
    res.status(201).json({ message: 'אימוץ נשמר בהצלחה!', adoption });
  } catch (error) {
    console.error('Error processing adoption request:', error);

    if (error.message.includes('Email already exists')) {
      return res.status(400).json({ message: 'המייל כבר קיים במערכת.' });
    }

    if (error.message.includes('Phone number already exists')) {
      return res.status(400).json({ message: 'מספר הטלפון כבר קיים במערכת.' });
    }

    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

//אימוצים לאורך זמן 
router.get('/overtime', getAdoptionsOverTime);

//אימוצים לפי סוג החיה
router.get('/by-animal-type', getAdoptionsByAnimalType);

module.exports = router;
