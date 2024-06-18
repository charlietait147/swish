import * as chai from "chai";
import chaiHttp from "chai-http";


import User from '../src/models/user.model.js';
import Cafe from '../src/models/cafe.model.js';
import jwt from 'jsonwebtoken';

import app from '../index.js';
import { connectDb } from '../src/db/db.connection.js';
import mongoose from "mongoose";

const { request } = chai.use(chaiHttp);

export const generateToken = (user) => {
    const payload = { _id: user._id, email: user.email };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
};

export const setupDatabase = async (userData, cafeData) => {

    try {
        await User.deleteMany({});
        await Cafe.deleteMany({});
        console.log('User and Cafe collections cleared');
    } catch (error) {
        console.error('Error clearing User and Cafe collections: ', error.message);
    }

    try {
        await Cafe.insertMany(cafeData);

        const users = await User.insertMany(userData);
        const userId = users[0]._id;

        const token = generateToken(users[0]);

        console.log('User and Cafe collections populated');
        return { userId, token };

    } catch (error) {
        console.error('Error populating User and Cafe collections: ', error.message);
    }
};

let serverInstance; // to keep the server running for all tests

export const initialiseSetup = () => { 
    before(async () => { // before all tests
        await connectDb(); // connect to the database
        if (!serverInstance) { // if the server is not already running
            serverInstance = app.listen(process.env.PORT || 3000, () => { // start the server
                console.log('Server started for tests'); // log that the server has started
            });
        }
    });

    after(async () => { // after all tests
        if (serverInstance) { // if the server is running
            await mongoose.connection.close(); // close the database connection
            await new Promise((resolve) => { // close the server
                serverInstance.close(resolve); // resolve the promise
            });
            console.log('Server stopped after tests');  // log that the server has stopped
        }
    });

    return request(app).keepOpen(); // return the request object
};