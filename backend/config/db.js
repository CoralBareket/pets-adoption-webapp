const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Log more details about the connection
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`Connection State: ${mongoose.connection.readyState}`);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Full error stack: ${error.stack}`);
    process.exit(1);
  }
};

module.exports = connectDB;
