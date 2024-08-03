import mongoose from 'mongoose';
import Cafe from './src/models/cafe.model.js';
import cafeData from './seed-data/cafe-data.js';
import { connectDb } from './src/db/db.connection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const upsertCafes = async (cafeData) => {
    for (const cafe of cafeData) {
            await Cafe.findOneAndUpdate(
                { name: cafe.name },
                { $set: cafe },
                { upsert: true }
            );
        }
};

const updateCafes = async () => {
    try {
        connectDb();
        console.log('Connected to the database');

        await upsertCafes(cafeData);
        console.log('Cafe data upserted');

        await mongoose.connection.close();
        console.log('Connection to the database closed');
    } catch (error) {
        console.error('Error connecting to the database: ', error.message);
        mongoose.connection.close();
        throw error;
    }
}

updateCafes().catch(console.error);