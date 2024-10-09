require('dotenv').config();
const mongoose = require('mongoose');
const Pet = require('../models/PetModel');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

const pets = [
    {
        name: "בריטני",
        age: 4,
        gender: "נקבה",
        breed: "מעורב",
        description: "בריטני היא קרמבו על ארבע, מתוקה ועדינה כמו סוכריה! אם אתה מחפש חברה מתוקה שתמיס לך את הלב, בריטני היא התשובה - רק תיזהר לא להתמכר לחיוך שלה.",
        imageUrl: "https://yad4.s3.amazonaws.com/images/21c63e8d-c009-4f4e-a8a9-edd13ed86cc5.png",
        status: "חדש באתר",
        size: "קטן",
        location: "צפון",
        animalType: "dog"
    },
    {
        name: "קרולינה",
        age: 5,
        gender: "נקבה",
        breed: "מעורב",
        description: "קרולינה היא פרופסור לחוכמת כלבים, עם פרווה שמזמינה ליטופים! היא תלמד אותך שיעור באהבה ללא תנאי, ובונוס - היא גם מומחית בלגרום לך לחייך כשאתה עצוב.",
        imageUrl: "https://yad4.s3.amazonaws.com/images/f4188cb3-ef4d-41de-ab30-4b68fa4ee81d.png",
        status: "חדש באתר",
        size: "בינוני",
        location: "דרום",
        animalType: "dog"
    },
    {
        name: "אש",
        age: 5,
        gender: "נקבה",
        breed: "מעורב",
        description: "אש היא גורה מתוקה שתשרוף לך את הלב באהבה! היא אמנם קטנה, אבל יש לה אישיות ענקית - היא תהפוך כל יום אפור ליום מלא הרפתקאות.",
        imageUrl: "https://yad4.s3.amazonaws.com/images/a951c841-73c4-4607-b27a-85ea2b99fc85.png",
        status: "חדש באתר",
        size: "בינוני",
        location: "מרכז",
        animalType: "cat"
    },
    {
        name: "מקס",
        age: 1,
        gender: "זכר",
        breed: "פינצר",
        description: "מקס הוא כמו אנרגיזר באני, רק בגרסת הכלב! אם אתה מחפש שותף לריצות בוקר או סתם מישהו שיגרום לך לצחוק כל היום, מקס הוא הבחירה המושלמת.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s",
        status: "חדש באתר",
        size: "קטן",
        location: "דרום",
        animalType: "dog"
    },
    {
        name: "נלה",
        age: 2,
        gender: "נקבה",
        breed: "מעורב",
        description: "נלה היא כמו כרית חמה ורכה, מושלמת לערבים קרירים! היא מומחית בלתת חיבוקים ובלהיות החברה הכי טובה שלך. בונוס: היא גם יודעת להכין קפה (טוב, אולי לא, אבל היא תשב לידך בזמן שאתה מכין).",
        imageUrl: "https://yad4.s3.amazonaws.com/images/11bc106d-ec21-4e9e-94eb-f5cf478012c3.png",
        status: "חדש באתר",
        size: "בינוני",
        location: "מרכז",
        animalType: "dog"
    },
    {
        name: "רקס",
        age: 5,
        gender: "זכר",
        breed: "רועה גרמני",
        description: "רקס הוא השומר האולטימטיבי, מחפש בית עם מרחב להרפתקאות! הוא יגן עליך מפני סכנות דמיוניות ואמיתיות כאחד. אם אתה רוצה כלב נאמן שגם יכול להיות הגיבור בסרט אקשן, רקס הוא הכוכב שאתה מחפש.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6D4QTeLuZ7nxZ1E_9W96t_8JD9fkUHcf7EA&s",
        status: "חדש באתר",
        size: "large",
        location: "דרום",
        animalType: "dog"
    },
    {
        name: "לילי",
        age: 2,
        gender: "נקבה",
        breed: "שיצו",
        description: "לילי היא כמו בובת פרווה חיה, מושלמת לחיבוקים ונשיקות! היא תהפוך כל יום גשום ליום שמשי עם החיוך שלה. אזהרה: אימוץ לילי עלול לגרום להתמכרות חמורה לחמידות.",
        imageUrl: "https://www.geva-zin.co.il/wp-content/uploads/2023/03/IMG-20230309-WA0049-500x500.jpg",
        status: "חדש באתר",
        size: "קטן",
        location: "מרכז",
        animalType: "dog"
    },
    {
        name: "סימבה",
        age: 1,
        gender: "זכר",
        breed: "חתול פרסי",
        description: "סימבה הוא מלך החתולים, עם פרווה זהובה ולב של זהב! הוא ישלוט על הספה שלך ועל הלב שלך במהירות שיא. אם אתה מוכן להיות המשרת הנאמן של חתול מלכותי, סימבה מחכה לך.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDWGT1sS_NtcvrhdZCoufSmNVTPoR99b25g&s",
        status: "חדש באתר",
        size: "קטן",
        location: "צפון",
        animalType: "cat"
    },
    {
        name: "ג'וני",
        age: 4,
        gender: "זכר",
        breed: "מעורב",
        description: "ג'וני הוא מכור לטיולים, מחפש שותף להרפתקאות! אם אתה אוהב לטייל בטבע, ג'וני יהיה המדריך הטוב ביותר שלך. הוא גם מומחה בלמצוא את המקומות הכי טובים לפיקניק (בעיקר אם יש שם אוכל).",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CZrl0wGbsEb-7TwCIUnIYQUMHSHCD22DzA&s",
        status: "חדש באתר",
        size: "גדול",
        location: "צפון",
        animalType: "dog"
    },
    {
        name: "שוקו",
        age: 3,
        gender: "זכר",
        breed: "לברדור",
        description: "שוקו הוא כמו מנת שוקולד חמה, ממיס כל לב! הוא אוהב לשחק, לרוץ ולתת המון אהבה. אזהרה: אימוץ שוקו עלול לגרום לעלייה פתאומית ברמת האושר שלך.",
        imageUrl: "https://spca.co.il/wp-content/uploads/2021/03/%D7%A7%D7%90%D7%99-3-scaled.jpg",
        status: "חדש באתר",
        size: "גדול",
        location: "צפון",
        animalType: "dog"
    },
    {
        name: "מיצי",
        age: 6,
        gender: "נקבה",
        breed: "מעורב",
        description: "מיצי היא פצצת אהבה קטנה, מחפשת בית חם להתפנק בו! היא מומחית בלשבת על המקלדת שלך בדיוק כשאתה צריך לעבוד. אם אתה מחפש תירוץ מושלם להפסקות תכופות בעבודה, מיצי היא הפתרון.",
        imageUrl: "https://static.wixstatic.com/media/2325d2_13857b568aaf4f95891375df9fad07e7~mv2.jpeg/v1/fill/w_300,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%D7%91%D7%95%D7%91%D7%99%20%D7%97%D7%AA%D7%95%D7%9C.jpeg",
        status: "חדש באתר",
        size: "קטן",
        location: "מרכז",
        animalType: "cat"
    },
    {
        name: "רוקי",
        age: 4,
        gender: "זכר",
        breed: "מעורב",
        description: "רוקי הוא כוכב רוק על ארבע, מחפש במה להופיע עליה (הספה שלך)! הוא יהפוך כל יום רגיל להופעת רוק מטורפת. אזהרה: אימוץ רוקי עלול לגרום לשכנים שלך להתלונן על מסיבות רועשות (אבל כיפיות).",
        imageUrl: "data:image/jpeg;base64,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",
        status: "אומץ",
        location: "מרכז",
        size: "medium",
        activity: "moderate",
        animalType: "dog"
    },
    {
        name: "מרמרה",
        age: 7,
        gender: "נקבה",
        breed: "חתול פרסי",
        description: "מרמרה היא כדור פרווה מתגלגל, אוהבת לישון ולאכול (בעיקר לאכול)! היא המומחית הגדולה ביותר בלהפוך כל מקום בבית למיטה. אם אתה מחפש שותפה לצפייה במרתונים של סדרות, מרמרה היא החברה המושלמת.",
        imageUrl: "https://img.mako.co.il/2012/04/22/249683.jpg",
        status: "חדש באתר",
        location: "מרכז",
        size: "medium",
        activity: "moderate",
        animalType: "cat"
    },
    {
        name: "בל",
        age: 1,
        gender: "זכר",
        breed: "אחר",
        description: "בל הוא ארנב קופצני ומתוק, מומחה בלאכול גזר ולהיות חמוד! הוא ידאג שהבית שלך תמיד יהיה מלא בשמחה ובקפיצות מתוקות. אזהרה: אימוץ בל עלול לגרום לך להוציא יותר כסף על גזרים מאשר על האוכל שלך.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKViufZXL0Ub_oAChts4504JPEyspry7Hd_w&s",
        status: "חדש באתר",
        location: "מרכז",
        size: "medium",
        activity: "moderate",
        animalType: "other"
    },
    {
        name: "ארנב ננסי",
        age: 5,
        gender: "זכר",
        animalType: "other",
        breed: "אחר",
        description: "ארנב ננסי הוא כמו צעצוע חי, קטן וחמוד ומוכן לאהבה! הוא יהפוך את הבית שלך לממלכת פלאים קטנה ומקסימה. אם אתה מחפש חיית מחמד שתגרום לכולם לומר 'אווו' בכל פעם שהם רואים אותה, ארנב ננסי הוא הבחירה המושלמת.",
        imageUrl: "https://www.dogs-cats.co.il/stores/20265/zoom/15174961380-1.jpeg",
        status: "חדש באתר",
        location: "מרכז",
        size: "small",
        activity: "low"
    },
    {
        name: "ארנב ננסי",
        age: 5,
        gender: "זכר",
        animalType: "other",
        breed: "אחר",
        description: "ארנב ננסי הוא כמו צעצוע חי, קטן וחמוד ומוכן לאהבה! הוא יהפוך את הבית שלך לממלכת פלאים קטנה ומקסימה. אם אתה מחפש חיית מחמד שתגרום לכולם לומר 'אווו' בכל פעם שהם רואים אותה, ארנב ננסי הוא הבחירה המושלמת.",
        imageUrl: "https://www.dogs-cats.co.il/stores/20265/zoom/15174961380-1.jpeg",
        status: "חדש באתר",
        location: "מרכז",
        size: "small",
        activity: "low"
    },
    {
        name: "פוקו",
        age: 3,
        gender: "זכר",
        breed: "פינצר",
        description: "פוקו הוא כמו פופקורן קופצני, תמיד מוכן למשחק ושעשועים! הוא ישמח את הבית שלך עם האנרגיה הבלתי נגמרת שלו ויהפוך כל יום רגיל להרפתקה מטורפת. אם אתה מחפש שותף לכושר שיגרום לך לצחוק בזמן שאתה מנסה לעשות מתיחות, פוקו הוא הכלב בשבילך.",
        imageUrl: "data:image/jpeg;base64,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",
        status: "חדש באתר",
        location: "מרכז",
        size: "small",
        activity: "high",
        animalType: "dog"
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