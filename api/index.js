const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./Routes/auth.route')
require('dotenv').config();
const app = express()

app.use('/api/auth', authRouter);








const port = process.env.PORT || 3000

app.listen(port, async () => {
    try {
       await connectDB();
        console.log(`server is running on port ${port}`)
    } catch (error) {
        console.log(`there is some problem ${error}`)
    }

})