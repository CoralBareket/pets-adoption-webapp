import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import '../assets/styles/AdminDashboard.css';

const AdoptionsByAnimalType = () => {
    const [data, setData] = useState([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // צבעים לכל חתך בעוגה

    const animalTypeLabels = {
        כלב: 'כלב',
        חתול: 'חתול',
        אחר: 'אחר',
        null: 'לא ידוע'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/adoptions/by-animal-type');
                
                // מיפוי הנתונים מה-API
                const formattedData = response.data.map(item => ({
                    name: animalTypeLabels[item._id] || 'לא ידוע',
                    value: item.count
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching adoptions by animal type:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3>אימוצים לפי סוג חיה</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdoptionsByAnimalType;