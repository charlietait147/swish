import { expect } from "chai";

import userData from "./data/testUser.js";
import { setupDatabase, initialiseSetup } from "./testSetup.js";


const { userDataToImport, wellFormedUser, userNoEmail, userWrongTypeEmail, userShortPassword } = userData;


describe("Testing Requests on User Collection", () => {

    let token;
    let userId;

    const testServer = initialiseSetup();

    before(async () => {
        ({ userId, token } = await setupDatabase(userDataToImport, []));
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

    describe(`POST request to /user/login`, () => {
        it('should return a 200 status code and the user when a well formed user is sent', async () => {
            //Arrange
            const { email } = userDataToImport[0];

            //Act
            const res = await testServer
                .post('/user/login')
                .send({ email, password: "testPassword123" });

            //Assert
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').that.equals('User logged in successfully');
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('email').that.equals(email);
            expect(res.body).to.have.property('token');
        });

        it('should return a 400 status code when a user with no email is sent', async () => {
            //Act
            const res = await testServer
                .post('/user/login')
                .send({ password: "testPassword123" });

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Login failed');
        });

        it('should return a 400 status code when a user with a wrong password is sent', async () => {
            //Arrange
            const { email } = userDataToImport[0];

            //Act
            const res = await testServer
                .post('/user/login')
                .send({ email, password: "testPassword1234" });

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Login failed');
        });
    });

    describe(`PUT request to /user/update-password`, () => {
        it('should return a 200 status code and the user when a well formed user is sent', async () => {
            //Arrange
            const { email } = userDataToImport[0];

            //Act
            const res = await testServer
                .put('/user/update-password')
                .set('Authorization', `Bearer ${token}`)
                .send({ newPassword: "newPassword123"});

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('email').that.equals(email);
            expect(res.body).to.have.property('password');
        });

        it('should return a 401 status code when a user with no token updates password', async () => {
            //Act
            const res = await testServer
                .put('/user/update-password')
                .send({ newPassword: "newPassword123" });

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
           
        });

        it('should return a 400 status code when a user updates password with a password that is too short', async () => {
            //Act
            const res = await testServer
                .put('/user/update-password')
                .set('Authorization', `Bearer ${token}`)
                .send({ newPassword: "newPass" });

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('["New password must be between 8 to 16 characters long and must contain at least one letter and one number"]');
        });
    });

});
