import mongoose from 'mongoose';
import Cafe from './src/models/cafe.model.js';
import { connectDb } from './src/db/db.connection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

export const removeCafe = async (cafeName) => {
    if (!cafeName) {
        console.log('No cafe name provided.');
        return false;
    }

    const result = await Cafe.deleteOne({ name: cafeName });
    if (result.deletedCount > 0) {
        console.log(`Cafe '${cafeName}' removed from the database.`);
        return true;
    } else {
        console.log(`Cafe '${cafeName}' not found in the database.`);
        return false;
    }
};

export const deleteCafes = async (cafeName) => {
    try {
        await connectDb();
        console.log('Connected to the database');

        if (cafeName) {
            await removeCafe(cafeName);
        } else {
            console.log('No cafe name specified. No cafes were removed.');
        }

        await mongoose.connection.close();
        console.log('Connection to the database closed');
    } catch (error) {
        console.error('Error during the delete operation: ', error.message);
        await mongoose.connection.close();
        throw error;
    }
}

// To delete a specific cafe, run this script and pass the cafe name like this:
deleteCafes('').catch(console.error);

