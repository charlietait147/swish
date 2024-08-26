import mongoose from 'mongoose';
import Cafe from './src/models/cafe.model.js';
import cafeData from './seed-data/cafe-data.js';
import { connectDb } from './src/db/db.connection.js';
import dotenv from 'dotenv';
import { testCafeData } from './test/data/testData.js';


dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const isTestEnv = process.env.NODE_ENV === "development";

export const upsertCafes = async (cafeData) => {
    for (const cafe of cafeData) {
            const { reviews, ...cafeDetails } = cafe; // Destructure to exclude reviews

        await Cafe.findOneAndUpdate(
            { name: cafe.name },
            { $set: cafeDetails }, // Update all fields except reviews
            { upsert: true }
        );
        }
};


// const updateCafes = async () => {
//     try {
//         connectDb();
//         console.log('Connected to the database');

//         await upsertCafes(cafeData);
//         console.log('Cafe data upserted');

//         await mongoose.connection.close();
//         console.log('Connection to the database closed');
//     } catch (error) {
//         console.error('Error connecting to the database: ', error.message);
//         mongoose.connection.close();
//         throw error;
//     }
// }


export const updateCafes = async () => {
    try {
        const data = isTestEnv ? testCafeData : cafeData;
        await upsertCafes(data);
        console.log('Cafe data upserted');
    } catch (error) {
        console.error('Error during the upsert operation: ', error.message);
        throw error;
    }
};

if (process.env.NODE_ENV === 'production') {
    (async () => {
        try {
            await connectDb();
            console.log('Connected to the database');
            await updateCafes();
        } catch (error) {
            console.error('Error connecting to the database: ', error.message);
        } finally {
            await mongoose.connection.close();
            console.log('Connection to the database closed');
        }
    })();
}

updateCafes().catch(console.error);