import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/assets/styles/MatchingQuiz.css';

const MatchingQuiz = () => {
    const [answers, setAnswers] = useState({
        age: '',
        familyStatus: '',
        hasYard: '',
        hoursAway: '',
        petFriendlyWork: '',
        houFngType: '',
        previousPets: '',
        activityLevel: '',
        allergies: '',
        petExpectations: '',
        budget: '',
        futurePlans: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // בדיקת תקינות - שדות חובה
        const requiredFields = [
            'age', 'familyStatus', 'hasYard', 'hoursAway', 'petFriendlyWork',
            'housingType', 'activityLevel', 'allergies', 'budget', 'futurePlans'
        ];

        const missingFields = requiredFields.filter(field => !answers[field]);

        if (missingFields.length > 0) {
            alert('יש למלא את כל השאלות המסומנות.');
            return;
        }

        try {
            const response = await fetch('/api/pets/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const matchedPets = await response.json();
            navigate('/results', { state: { matchedPets } });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="matching-quiz">
            <h2>שאלון התאמה</h2>
            <form onSubmit={handleSubmit}>
                <div className="question">
                    <label>1. בן/ת כמה את/ה? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="age"
                                value="20-25"
                                checked={answers.age === '20-25'}
                                onChange={handleChange}
                            />
                            20-25
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="age"
                                value="26-35"
                                checked={answers.age === '26-35'}
                                onChange={handleChange}
                            />
                            26-35
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="age"
                                value="36-50"
                                checked={answers.age === '36-50'}
                                onChange={handleChange}
                            />
                            36-50
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="age"
                                value="older than that"
                                checked={answers.age === 'older than that'}
                                onChange={handleChange}
                            />
                            מבוגר מזה
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>2. מהו מצבך המשפחתי? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="familyStatus"
                                value="single"
                                checked={answers.familyStatus === 'single'}
                                onChange={handleChange}
                            />
                            רווק/ה
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="familyStatus"
                                value="couple"
                                checked={answers.familyStatus === 'couple'}
                                onChange={handleChange}
                            />
                            זוג צעיר
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="familyStatus"
                                value="roommates"
                                checked={answers.familyStatus === 'roommates'}
                                onChange={handleChange}
                            />
                            שותפים
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="familyStatus"
                                value="family"
                                checked={answers.familyStatus === 'family'}
                                onChange={handleChange}
                            />
                            משפחה
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>3. האם יש חצר/מרפסת בבית? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="hasYard"
                                value="yes"
                                checked={answers.hasYard === 'yes'}
                                onChange={handleChange}
                            />
                            כן
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="hasYard"
                                value="no"
                                checked={answers.hasYard === 'no'}
                                onChange={handleChange}
                            />
                            לא
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>4. מה סוג המגורים שלך? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="housingType"
                                value="apartment"
                                checked={answers.housingType === 'apartment'}
                                onChange={handleChange}
                            />
                            דירה
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="housingType"
                                value="house"
                                checked={answers.housingType === 'house'}
                                onChange={handleChange}
                            />
                            בית פרטי
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="housingType"
                                value="other"
                                checked={answers.housingType === 'other'}
                                onChange={handleChange}
                            />
                            אחר
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>5. האם הייתה לך חיית מחמד בעבר? אם כן, איזה סוג?</label>
                    <input
                        type="text"
                        name="previousPets"
                        value={answers.previousPets}
                        onChange={handleChange}
                    />
                </div>

                <div className="question">
                    <label>6. כמה שעות אתם נמצאים מחוץ לבית ביום בממוצע? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="hoursAway"
                                value="Six hours at most"
                                checked={answers.hoursAway === 'Six hours at most'}
                                onChange={handleChange}
                            />
                            6 שעות לכל היותר
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="hoursAway"
                                value="7-10 hours"
                                checked={answers.hoursAway === '7-10 hours'}
                                onChange={handleChange}
                            />
                            7-10 שעות
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="hoursAway"
                                value="10 hours at least"
                                checked={answers.hoursAway === '10 hours at least'}
                                onChange={handleChange}
                            />
                            10 שעות לפחות
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>7. האם מקום העבודה שלכם pet friendly? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="petFriendlyWork"
                                value="yes"
                                checked={answers.petFriendlyWork === 'yes'}
                                onChange={handleChange}
                            />
                            כן
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="petFriendlyWork"
                                value="no"
                                checked={answers.petFriendlyWork === 'no'}
                                onChange={handleChange}
                            />
                            לא
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>8. עד כמה אורח החיים שלך פעיל? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="activityLevel"
                                value="active"
                                checked={answers.activityLevel === 'active'}
                                onChange={handleChange}
                            />
                            מאוד פעיל
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="activityLevel"
                                value="moderate"
                                checked={answers.activityLevel === 'moderate'}
                                onChange={handleChange}
                            />
                            פעיל במידה בינונית
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="activityLevel"
                                value="low"
                                checked={answers.activityLevel === 'low'}
                                onChange={handleChange}
                            />
                            לא פעיל במיוחד
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>9. האם יש לך או לאחד מבני המשפחה אלרגיות לחיות? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="allergies"
                                value="yes"
                                checked={answers.allergies === 'yes'}
                                onChange={handleChange}
                            />
                            כן
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="allergies"
                                value="no"
                                checked={answers.allergies === 'no'}
                                onChange={handleChange}
                            />
                            לא
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>10. מה חשוב לך שיהיה בחיית המחמד?</label>
                    <input
                        type="text"
                        name="petExpectations"
                        value={answers.petExpectations}
                        onChange={handleChange}
                    />
                </div>

                <div className="question">
                    <label>11. כמה כסף אתה מוכן להשקיע בתחזוקת חיית מחמד? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="budget"
                                value="low"
                                checked={answers.budget === 'low'}
                                onChange={handleChange}
                            />
                            תקציב נמוך
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="budget"
                                value="medium"
                                checked={answers.budget === 'medium'}
                                onChange={handleChange}
                            />
                            תקציב בינוני
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="budget"
                                value="high"
                                checked={answers.budget === 'high'}
                                onChange={handleChange}
                            />
                            תקציב גבוה
                        </label>
                    </div>
                </div>

                <div className="question">
                    <label>12. האם יש לך תכניות עתידיות כמו מעבר דירה? * </label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="futurePlans"
                                value="yes"
                                checked={answers.futurePlans === 'yes'}
                                onChange={handleChange}
                            />
                            כן
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="futurePlans"
                                value="no"
                                checked={answers.futurePlans === 'no'}
                                onChange={handleChange}
                            />
                            לא
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-button">שלח</button>
            </form>
        </div>
    );
};

export default MatchingQuiz;
