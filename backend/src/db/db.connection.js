import mongoose from 'mongoose';
import config from './db.config.js';

const { uri } = config.db;

export const connectDb = async () => {
    try {
        await mongoose.connect(uri), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
        };
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database: ', error.message);
    }
};