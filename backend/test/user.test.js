import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";
import userData from "./data/testUser.js";
import User from "../src/models/user.model.js";

const { request } = chai.use(chaiHttp);

const { userDataToImport, wellFormedUser, userNoEmail, userWrongTypeEmail, userShortPassword } = userData;

describe("Testing Requests on User Collection", () => {

    const testServer = request(server).keepOpen();

    beforeEach(async () => {
        try {
            await User.deleteMany({});
            console.log('User collection cleared');
        } catch (error) {
            console.error('Error clearing User collection: ', error.message);
        };
        try {
            await User.insertMany(userDataToImport);
            console.log('User collection populated with users');
        } catch (error) {
            console.error('Error populating User collection: ', error.message);
        }
    });

    describe(`POST request to /user/register`, () => {
        it('should return a 201 status code and the user when a well formed user is sent', async () => {
            //Act
            const res = await testServer
                .post('/user/register')
                .send(wellFormedUser);

            //Assert
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').that.equals('User registered successfully');
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('email').that.equals(wellFormedUser.email);
            expect(res.body).to.have.property('token');
        });

        it(`should return a 400 status code when a user with no email is sent`, async () => {
            //Act
            const res = await testServer
                .post('/user/register')
                .send(userNoEmail);

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('["Please provide a valid email address"]');
        });

        it('should return a 400 status code when a user with an email of the wrong type is sent', async () => {
            //Act
            const res = await testServer
                .post('/user/register')
                .send(userWrongTypeEmail);

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('["Please provide a valid email address"]');
        });

        it('should return a 400 status code when a user with a password that is too short is sent', async () => {
            //Act
            const res = await testServer
                .post('/user/register')
                .send(userShortPassword);

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('["Password must be between 8 to 16 characters long and must contain at least one letter and one number"]');
        });
    });
});

