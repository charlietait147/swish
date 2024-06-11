import cafeData from '../seed-data/cafe-data.js';
import Cafe from '../src/models/cafe.model.js';
import mongoose from 'mongoose';
import { connectDb } from '../src/db/db.connection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const seedDatabase = async () => {
    try {
        connectDb();
        console.log('Connected to the database');

        await Cafe.insertMany(cafeData);
        console.log('Cafe data added to the database');

        await mongoose.connection.close();
        console.log('Connection to the database closed');
    } catch(error) {
            console.error('Error connecting to the database: ', error.message);
            mongoose.connection.close();
            throw error;
     };
    };

    seedDatabase().catch(console.error);



    
