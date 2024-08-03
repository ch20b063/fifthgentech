import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/deviceRoutes.js';
import { dbConnection } from './database/dbcollection';
config({
    path: './config/config.env'
});


const app = express();

cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});
app.get('/api', deviceRoutes );
app.use(express.json());
dbConnection();
export default app;