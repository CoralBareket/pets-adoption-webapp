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
        description: "קסם המתוקה, גורה בת 9 חודשים נמצאה באזור רמת גן. קסם המתוקה, גורה בת 9 חודשים נמצאה באזור רמת גן משוטטת ומבוהלת! יחסית קטנה מאוד (13-15 ק״ג).",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/08ad27fa-9d28-435a-9b7a-113a3e2c0cc5.png"
    },
    {
        name: "בריטני",
        age: "4 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        description: "בריטני הגורה שהיא פשוט קרמבו ממש! נמצא קרמבו דוב מתוק מטוגן מתוק, קרם שוקולד, קרם מתוק, יש בה בייסקוויט מתוק, קרם מתוק, שוקולד מתוק והכל מתוק.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/21c63e8d-c009-4f4e-a8a9-edd13ed86cc5.png"
    },
    {
        name: "קרולינה",
        age: "5 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        description: "קרולינה הבוגרת והחכמה, היא מזכירה לכם בכל רגע שהיא מכבדת את כולם! יש לה פרווה שמפשוט אי אפשר להפסיק ללטף ואם היא מרוצה היא תכרבל אליך וגם תשכב.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/f4188cb3-ef4d-41de-ab30-4b68fa4ee81d.png"
    },
    {
        name: "אש",
        age: "5 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        description: "אש, גורה מתוקה ממש, עדינה ומתפנקת. כל היום אוהבת להסתובב בינות לרגליים שלכם. מחכה לבית אוהב מלא באהבה.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/a951c841-73c4-4607-b27a-85ea2b99fc85.png"
    },
    {
        name: "ג'וני",
        age: "4 שנים",
        gender: "זכר",
        breed: "מעורב",
        description: "ג'וני אוהב להריח סביבו, מושלם לפעילויות בחוץ.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CZrl0wGbsEb-7TwCIUnIYQUMHSHCD22DzA&s"
    },
    {
        name: "נלה",
        age: "2 שנים",
        gender: "נקבה",
        breed: "מעורב",
        description: "נלה היא כלבה עדינה ושקטה, אוהבת ליטופים ומחפשת בית חם.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://yad4.s3.amazonaws.com/images/11bc106d-ec21-4e9e-94eb-f5cf478012c3.png"
    },
    {
        name: "מקס",
        age: "1 שנה",
        gender: "זכר",
        breed: "פינצר",
        description: "מקס הוא כלב אנרגטי ומלא שמחת חיים, מחפש משפחה פעילה.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQqL15KtY4NWV2EIxK62AyGxiBZ8wwKuCjA&s"
    },
    {
        name: "שוקו",
        age: "3 שנים",
        gender: "זכר",
        breed: "לברדור",
        description: "שוקו הוא כלב חברותי ונאמן, אוהב ילדים ומשחקים. הוא אנרגטי ומתאים למשפחה פעילה שתיקח אותו לטיולים ארוכים.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://spca.co.il/wp-content/uploads/2021/03/%D7%A7%D7%90%D7%99-3-scaled.jpg"
    },
    {
        name: "מיצי",
        age: "6 חודשים",
        gender: "נקבה",
        breed: "מעורב",
        description: "מיצי היא חתולה קטנה ומתוקה, שנמצאה ברחוב והובאה למקלט. היא שובבה, אוהבת משחקים ומחפשת בית חם ואוהב.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "https://static.wixstatic.com/media/2325d2_13857b568aaf4f95891375df9fad07e7~mv2.jpeg/v1/fill/w_300,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%D7%91%D7%95%D7%91%D7%99%20%D7%97%D7%AA%D7%95%D7%9C.jpeg"
    },
    {
        name: "רקס",
        age: "5 שנים",
        gender: "זכר",
        breed: "רועה גרמני",
        description: "רקס הוא כלב שמירה מעולה, נאמן ואינטליגנטי. הוא זקוק לבעלים עם ניסיון בגידול כלבים גדולים ולמרחב גדול לרוץ בו.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "data:image/jpeg;base64,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"
    },
    {
        name: "לילי",
        age: "2 שנים",
        gender: "נקבה",
        breed: "שיצו",
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
        description: "סימבה הוא חתול יפהפה עם פרווה ארוכה וזהובה. הוא אוהב ליטופים ושקט, מתאים לבית רגוע ולמשפחה שתטפח אותו.",
        isAdopted: false,
        status: "חדש באתר",
        imageUrl: "data:image/jpeg;base64,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"
    }
];

Pet.insertMany(pets)
    .then(res => {
        console.log('Pets inserted:', res);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Failed to insert pets', err);
        mongoose.connection.close();
    });