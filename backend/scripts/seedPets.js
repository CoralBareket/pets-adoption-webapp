require('dotenv').config();
const mongoose = require('mongoose');
const Pet = require('../models/Pet');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

const pets = [
    {
        name: "קסם",
        age: "9 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        size: "בינוני",
        activityLevel: "low",
        trained: false,
        description: "קסם המתוקה, גורה בת 9 חודשים נמצאה באזור רמת גן. יחסית קטנה מאוד (13-15 ק״ג).",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/08ad27fa-9d28-435a-9b7a-113a3e2c0cc5.png"
    },
    {
        name: "בריטני",
        age: "4 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        size: "קטן",
        activityLevel: "medium",
        trained: false,
        description: "בריטני הגורה שהיא פשוט קרמבו ממש! מתוקה ועדינה.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/21c63e8d-c009-4f4e-a8a9-edd13ed86cc5.png"
    },
    {
        name: "קרולינה",
        age: "5 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        size: "בינוני",
        activityLevel: "medium",
        trained: false,
        description: "קרולינה היא כלבה בוגרת עם הרבה חכמה, עם פרווה שאי אפשר להפסיק ללטף.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/f4188cb3-ef4d-41de-ab30-4b68fa4ee81d.png"
    },
    {
        name: "אש",
        age: "5 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        size: "בינוני",
        activityLevel: "low",
        trained: false,
        description: "אש, גורה מתוקה, עדינה ואוהבת ליטופים.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/a951c841-73c4-4607-b27a-85ea2b99fc85.png"
    },
    {
        name: "ג'וני",
        age: "4 שנים",
        gender: "זכר",
        breed: "מעורב",
        size: "גדול",
        activityLevel: "high",
        trained: true,
        description: "ג'וני אוהב טיולים בחוץ ופעילויות מרובות.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CZrl0wGbsEb-7TwCIUnIYQUMHSHCD22DzA&s"
    },
    {
        name: "נלה",
        age: "2 שנים",
        gender: "נקבה",
        breed: "מעורב",
        size: "בינוני",
        activityLevel: "low",
        trained: true,
        description: "נלה היא כלבה עדינה ושקטה, מושלמת לבית חם ושקט.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/11bc106d-ec21-4e9e-94eb-f5cf478012c3.png"
    },
    {
        name: "מקס",
        age: "1 שנה",
        gender: "זכר",
        breed: "פינצר",
        size: "קטן",
        activityLevel: "high",
        trained: true,
        description: "מקס הוא כלב אנרגטי שמחפש משפחה פעילה.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s"
    },
    {
        name: "שוקו",
        age: "3 שנים",
        gender: "זכר",
        breed: "לברדור",
        size: "גדול",
        activityLevel: "high",
        trained: true,
        description: "שוקו הוא כלב חברותי ואנרגטי, מתאים למשפחה פעילה.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://spca.co.il/wp-content/uploads/2021/03/%D7%A7%D7%90%D7%99-3-scaled.jpg"
    },
    {
        name: "מיצי",
        age: "6 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        size: "קטן",
        activityLevel: "low",
        trained: false,
        description: "מיצי היא חתולה קטנה ומתוקה, מחפשת בית חם ואוהב.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://static.wixstatic.com/media/2325d2_13857b568aaf4f95891375df9fad07e7~mv2.jpeg/v1/fill/w_300,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%D7%91%D7%95%D7%91%D7%99%20%D7%97%D7%AA%D7%95%D7%9C.jpeg"
    },
    {
        name: "רקס",
        age: "5 שנים",
        gender: "זכר",
        breed: "רועה גרמני",
        size: "large",
        activityLevel: "high",
        trained: true,
        description: "רקס הוא כלב שמירה נאמן, מחפש בית עם מרחב גדול לבעלים מנוסים.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6D4QTeLuZ7nxZ1E_9W96t_8JD9fkUHcf7EA&s"
    },
    {
        name: "לילי",
        age: "2 שנים",
        gender: "נקבה",
        breed: "שיצו",
        size: "קטן",
        activityLevel: "low",
        trained: true,
        description: "לילי היא כלבה קטנה ומקסימה, אוהבת חיבוקים ומושלמת לדירה קטנה. היא שקטה יחסית ומתאימה גם לבעלים מבוגרים.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://www.geva-zin.co.il/wp-content/uploads/2023/03/IMG-20230309-WA0049-500x500.jpg"
    },
    {
        name: "סימבה",
        age: "1 שנה",
        gender: "זכר",
        breed: "חתול פרסי",
        size: "קטן",
        activityLevel: "low",
        trained: true,
        description: "סימבה הוא חתול יפהפה עם פרווה ארוכה וזהובה. הוא אוהב ליטופים ושקט, מתאים לבית רגוע ולמשפחה שתטפח אותו.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDWGT1sS_NtcvrhdZCoufSmNVTPoR99b25g&s"
    }
];

const seedPets = async () => {
    for (const petData of pets) {
        await Pet.findOneAndUpdate(
            { name: petData.name },
            petData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    // לאחר ההכנסה, נבדוק אם יש כפילויות ונמחק אותן
    const allPets = await Pet.find();
    const petNames = allPets.map(pet => pet.name);

    for (const name of new Set(petNames)) {
        const duplicates = await Pet.find({ name });
        if (duplicates.length > 1) {
            // נשאיר רק את הרשומה הראשונה ונמחק את השאר
            await Pet.deleteMany({ _id: { $in: duplicates.slice(1).map(pet => pet._id) } });
        }
    }

    console.log('Pets updated/inserted successfully and duplicates removed');
    mongoose.connection.close();
};

seedPets().catch(err => {
    console.log('Failed to update/insert pets', err);
    mongoose.connection.close();
});