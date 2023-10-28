const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./Routes/auth.route');
const songRouter = require("./Routes/song.route");
const errorMiddleware = require('./Middlewares/error.middleware');
require('dotenv').config();
const app = express()

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/songs',songRouter)
app.use(errorMiddleware);







const port = process.env.PORT || 3000

app.listen(port, async () => {
    try {
       await connectDB();
        console.log(`server is running on port ${port}`)
    } catch (error) {
        console.log(`there is some problem ${error}`)
    }

})