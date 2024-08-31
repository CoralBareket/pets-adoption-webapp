const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dogRoutes = require('./routes/dogRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // will create this later

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/dogs', dogRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
