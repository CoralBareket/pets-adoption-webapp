import React, { useEffect, useState } from 'react';
import '../assets/styles/AdminDashboard.css';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const AdoptionsOverTime = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/adoptions/overtime'); // קריאה ל-API
                console.log("Fetched adoptions data:", response.data); 
                const formattedData = response.data.map(item => ({
                    date: item._id,
                    count: item.count
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching adoptions over time data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3>אימוצים לפי יום (7 ימים אחרונים)</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdoptionsOverTime;
