const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['זכר', 'נקבה'],
        required: true
    },
    animalType: {
        type: String,
        enum: ['dog', 'cat', 'other'],
    },
    breed: {
        type: String,
        enum: [
            'מעורב', 
            'שועלי', 
            'פינצר', 
            'האסקי סיבירי', 
            'טרייר', 
            'ביגל', 
            'חתול פרסי', 
            'לברדור', 
            'רועה גרמני', 
            'שיצו',
            'אחר',         
            'חתול חבשי',    
            'חתול סיאמי'    
        ],
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['חדש באתר', 'אומץ', 'הוסר'],
        default: 'חדש באתר'
    },
    location: {
        type: String,
        enum: ['צפון', 'מרכז', 'דרום'],
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large']
    },
    activity: {
        type: String,
        enum: ['low', 'moderate', 'high']
    }
}, {
    timestamps: true 
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;