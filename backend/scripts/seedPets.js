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
        animalType: "כלב"
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
        animalType: "חתול"
    },
    {
        name: "אש",
        age: 5,
        gender: "נקבה",
        breed: "חתול חבשי",
        description: "אש היא גורה מתוקה שתשרוף לך את הלב באהבה! היא אמנם קטנה, אבל יש לה אישיות ענקית - היא תהפוך כל יום אפור ליום מלא הרפתקאות.",
        imageUrl: "https://yad4.s3.amazonaws.com/images/a951c841-73c4-4607-b27a-85ea2b99fc85.png",
        status: "חדש באתר",
        size: "בינוני",
        location: "מרכז",
        animalType: "חתול"
    },
    {
        name: "מקס",
        age: 1,
        gender: "זכר",
        breed: "פינצר",
        description: "מקס הוא כמו אנרגיזר באני, רק בגרסת הכלב! אם אתה מחפש שותף לריצות בוקר או סתם מישהו שיגרום לך לצחוק כל היום, מקס הוא הבחירה המושלמת.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s",
        status: "חדש באתר",
        size: "'קטן'",
        location: "דרום",
        animalType: "כלב"
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
        animalType: "כלב"
    },
    {
        name: "רקס",
        age: 5,
        gender: "זכר",
        breed: "רועה גרמני",
        description: "רקס הוא השומר האולטימטיבי, מחפש בית עם מרחב להרפתקאות! הוא יגן עליך מפני סכנות דמיוניות ואמיתיות כאחד. אם אתה רוצה כלב נאמן שגם יכול להיות הגיבור בסרט אקשן, רקס הוא הכוכב שאתה מחפש.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6D4QTeLuZ7nxZ1E_9W96t_8JD9fkUHcf7EA&s",
        status: "חדש באתר",
        size: "גדול",
        location: "דרום",
        animalType: "כלב"
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
        animalType: "כלב"
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
        animalType: "חתול"
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
        animalType: "כלב"
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
        animalType: "כלב"
    },
    {
        name: "מיצי",
        age: 6,
        gender: "נקבה",
        breed: "מעורב",
        description: "מיצי היא פצצת אהבה קטנה, מחפשת בית חם להתפנק בו! היא מומחית בלשבת על המקלדת שלך בדיוק כשאתה צריך לעבוד. אם אתה מחפש תירוץ מושלם להפסקות תכופות בעבודה, מיצי היא הפתרון.",
        imageUrl: "https://static.wixstatic.com/media/2325d2_13857b568aaf4f95891375df9fad07e7~mv2.jpeg/v1/fill/w_300,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%D7%91%D7%95%D7%91%D7%99%20%D7%97%D7%AA%D7%95%D7%9C.jpeg",
        status: "חדש באתר",
        size: "small",
        location: "מרכז",
        animalType: "כלב"
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
        size: "בינוני",
        activity: "בינונית",
        animalType: "כלב"
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
        size: "בינוני",
        activity: "גבוהה",
        animalType: "חתול"
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
        size: "בינוני",
        activity: "בינונית",
        animalType: "אחר"
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
        size: "קטן",
        activity: "נמוכה"
    },
    {
        name: "ארנב ננסי",
        age: 5,
        gender: "זכר",
        animalType: "אחר",
        breed: "אחר",
        description: "ארנב ננסי הוא כמו צעצוע חי, קטן וחמוד ומוכן לאהבה! הוא יהפוך את הבית שלך לממלכת פלאים קטנה ומקסימה. אם אתה מחפש חיית מחמד שתגרום לכולם לומר 'אווו' בכל פעם שהם רואים אותה, ארנב ננסי הוא הבחירה המושלמת.",
        imageUrl: "https://www.dogs-cats.co.il/stores/20265/zoom/15174961380-1.jpeg",
        status: "חדש באתר",
        location: "מרכז",
        size: "קטן",
        activity: "בינונית"
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
        size: "קטן",
        activity: "גבוהה",
        animalType: "כלב"
    },

    {
        name: "מירי",
        age: 7,
        gender: "נקבה",
        breed: "פינצר",
        description: "מירי היא לא סתם כלבה, היא כלבה אמיתית! ואנחנו אוהבים אותה כמו שהיא. תראו איזה חיוך... נמסנו",
        imageUrl: "data:image/jpeg;base64,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",
        status: "אומץ",
        location: "מרכז",
        size: "קטן",
        activity: "בינונית",
        animalType: "כלב"
    },

    {
        name: "מיצי",
        age: 5,
        gender: "נקבה",
        breed: "חתול סיאמי",
        description: "מיצי היא פצצת אהבה קטנה, מחפשת בית חם להתפנק בו! היא מומחית בלשבת על המקלדת שלך בדיוק כשאתה צריך לעבוד. אם אתה מחפש תירוץ מושלם להפסקות תכופות בעבודה, מיצי היא הפתרון.",
        imageUrl: "data:image/jpeg;base64,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",
        status: "חדש באתר",
        location: "צפון",
        size: "בינוני",
        activity: "בינונית",
        animalType: "חתול"
    },

    {
        name: "לולה",
        age: 2,
        gender: "נקבה",
        breed: "חתול פרסי",
        description: "תולה חמודה בת שנתיים, מאוד רגועה ואוהבת להתפנק..",
        imageUrl: "data:image/jpeg;base64,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",
        status: "אומץ",
        location: "דרום",
        size: "קטן",
        activity: "גבוהה",
        animalType: "חתול"
    },

    {
        name: "לוקה",
        age: 10,
        gender: "נקבה",
        breed: "האסקי סיבירי",
        description: "מחפשים משפחה מאמצת ללוקה המדהים שלנו בעקבות פטירה של אמנו האהובה. לוקה כלב נוח ועדין, מתאים לבית עם ילדים.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFYCd8CZ0v9hPS1Fhq6tNFtt0PeTV47ewh0A&s",
        status: "חדש באתר",
        location: "דרום",
        size: "קטן",
        activity: "בינונית",
        animalType: "כלב"
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