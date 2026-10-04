import * as chai from "chai";
import chaiHttp from "chai-http";


import User from '../src/models/user.model.js';
import Cafe from '../src/models/cafe.model.js';
import Review from '../src/models/review.model.js';

import jwt from 'jsonwebtoken';

import app from '../index.js';
import { connectDb } from '../src/db/db.connection.js';
import mongoose from "mongoose";

const { request } = chai.use(chaiHttp);

export const generateToken = (user) => {
    const payload = { _id: user._id, email: user.email };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
};

export const setupDatabase = async (userData, cafeData, reviewData) => {

    try {
        await User.deleteMany({});
        await Cafe.deleteMany({});
        await Review.deleteMany({});
        console.log('User, Cafe and Review collections cleared');
    } catch (error) {
        console.error('Error clearing User and Cafe collections: ', error.message);
    }

    try {
        await Cafe.insertMany(cafeData);

        await Review.insertMany(reviewData);

        const users = await User.insertMany(userData);
        const userId = users[0]._id;

        const token = generateToken(users[0]);

        console.log('User, Cafe and Review collections populated');
        return { userId, token };

    } catch (error) {
        console.error('Error populating User and Cafe collections: ', error.message);
    }
};

export const initialiseSetup = () => { 
    before(async () => { // before all tests
        await connectDb(); // connect to the database
    });

    after(async () => { // after all tests
        await mongoose.connection.close(); // close the database connection
    });

    return request(app).keepOpen(); // return the request object
};