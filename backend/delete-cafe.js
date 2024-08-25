import mongoose from 'mongoose';
import Cafe from './src/models/cafe.model.js';
import { connectDb } from './src/db/db.connection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const removeCafe = async (cafeName) => {
    const result = await Cafe.deleteOne({ name: cafeName });
    if (result.deletedCount > 0) {
        console.log(`Cafe '${cafeName}' removed from the database.`);
        return true; // Indicates deletion was successful
    } else {
        console.log(`Cafe '${cafeName}' not found in the database.`);
        return false; // Indicates deletion was unsuccessful
    }
};

const deleteCafes = async () => {
    try {
        await connectDb();
        console.log('Connected to the database');

        // Specify cafes to remove
        await removeCafe('');

        await mongoose.connection.close();
        console.log('Connection to the database closed');
    } catch (error) {
        console.error('Error during the delete operation: ', error.message);
        await mongoose.connection.close();
        throw error;
    }
}

deleteCafes().catch(console.error);

export { removeCafe, deleteCafes };