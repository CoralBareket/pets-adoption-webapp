const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['זכר', 'נקבה'],
        required: true
    },
    breed: {
        type: String,
        enum: ['מעורב', 'שועלי', 'פינצר', 'האסקי סיבירי' , 'טרייר', 'ביגל', 'חתול פרסי', 'לברדור', 'רועה גרמני', 'שיצו', ],
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
        enum: ['חדש באתר', 'אומץ'],
        default: 'חדש באתר'
    },
    location: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large']
    },
    activity: {
        type: String,
        enum: ['low', 'moderate', 'high']
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;