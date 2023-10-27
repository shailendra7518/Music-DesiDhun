require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
     mongoose.connect(process.env.DB_URL);
        
    } catch (error) {
        console.log(`error in connectDB${error}`)
    }
}

module.exports = connectDB;