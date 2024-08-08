import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/deviceRoutes.js';
import  dbConnection from './database/dbcollection.js';
config({
    path: './config/config.env'
});


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(express.json());
app.use('/api', deviceRoutes);

dbConnection();

export default app;