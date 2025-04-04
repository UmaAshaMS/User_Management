import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

mongoose
    .connect(process.env.MONGO_URL)
    .then( () => {
        console.log('MongoDB connected')
    })
    .catch( (err) => {
        console.log(err)
    });

const app = express();
app.use(express.json()); //Inoreder to recieve json data

app.listen(3000, () => {
    console.log('Server listening on port 3000!')
})


app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })



})