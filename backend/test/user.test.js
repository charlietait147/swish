import { expect } from "chai";
import fs from "fs";
import path from "path";

import userData from "./data/testUser.js";
import { testCafeData } from "./data/testData.js";
import { setupDatabase, initialiseSetup } from "./testSetup.js";
import { avatarsDir } from "../src/middleware/avatar.upload.js";


const { userDataToImport, wellFormedUser, userNoEmail, userWrongTypeEmail, userShortPassword } = userData;



describe("Testing Requests on User Collection", () => {

    let token;
    let userId;

    const testServer = initialiseSetup();

    before(async () => {
        ({ userId, token } = await setupDatabase(userDataToImport, testCafeData, []));
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
            expect(res.text).to.equal('["Password must be at least 8 characters long and must contain at least one letter and one number"]');
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
            expect(res.text).to.equal('Invalid email or password');
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
            expect(res.text).to.equal('Invalid email or password');
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
            expect(res.text).to.equal('["New password must be at least 8 characters and must contain at least one letter and one number"]');
        });
    });

    describe(`POST request to /user/add-cafe/:cafeId`, () => {
        it('should return a 200 status code and a message when the user adds a cafe', async () => {
            //Act
            const res = await testServer
                .post(`/user/add-cafe/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.equals('Cafe added to user successfully');
            expect(res.body.user).to.have.property('cafes').that.is.an('array').that.has.lengthOf(1);
        });

        it('should return a 401 status code when a user with no token adds a cafe', async () => {
            //Act
            const res = await testServer
                .post(`/user/add-cafe/${testCafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });

        it('should return a 400 status code when a user tries to add a cafe that is already added', async () => {
            //Act
            const res = await testServer
                .post(`/user/add-cafe/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(400);
            expect(res.body.error).to.equal('Cafe already added');
        });
    });

    describe(`GET request to /user/cafes`, () => {
        it('should return a 200 status code and the cafes when the user fetches the cafes', async () => {
            //Act
            const res = await testServer
                .get('/user/cafes')
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body.cafes).to.be.an('array').that.has.lengthOf(1);
            expect(res.body.cafes[0]).to.have.property('name').that.equals(testCafeData[0].name);
            expect(res.body.cafes[0]).to.have.property('locations').that.deep.equals(testCafeData[0].locations);
            expect(res.body.cafes[0]).to.have.property('description').that.equals(testCafeData[0].description);
        });

        it('should return a 401 status code when a user with no token tries to get cafes', async () => {
            //Act
            const res = await testServer
                .get('/user/cafes');

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });
    });

    describe(`DELETE request to /user/:cafeId`, () => {
        it('should return a 200 status code and a message when the user deletes a cafe', async () => {
            //Act
            const res = await testServer
                .delete(`/user/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.equals('Cafe deleted successfully');
            // expect(res.body.user).to.have.property('cafes').that.is.an('array').that.has.lengthOf(0);
            ;
        });

        it('should return a 401 status code when a user with no token deletes a cafe', async () => {
            //Act
            const res = await testServer
                .delete(`/user/${testCafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });

        it('should return a 400 status code when a user tries to delete a cafe that is not added', async () => {
            //Act
            const res = await testServer
                .delete(`/user/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(400);
            console.log(res.body.error);
            expect(res.body.error).to.equal('Cafe not found');
        });
    });

    describe(`GET request to /user/`,() => {
        it('should return a 200 status code and the user when the user fetches their profile', async () => {
            //Act
            const res = await testServer
                .get('/user')
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('email').that.equals(userDataToImport[0].email);
            expect(res.body).to.have.property('password');
            expect(res.body).to.have.property('cafes').that.is.an('array').that.has.lengthOf(0);
            expect(res.body).to.have.property('reviews').that.is.an('array').that.has.lengthOf(0);
        });

        it('should return a 401 status code when a user with no token tries to get their profile', async () => {
            //Act
            const res = await testServer
                .get('/user');

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });
    });

    describe(`GET request to /user/isCafeSaved/:cafeId`, () => {
        it('should return a 200 status code and a message that the cafe is saved when the user checks if a cafe is saved', async () => {

            //Arrange
            await testServer
                .post(`/user/add-cafe/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);
                
            //Act
            const res = await testServer
                .get(`/user/isCafeSaved/${testCafeData[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            const parsedResponse = JSON.parse(res.text);
            expect(parsedResponse).to.deep.equal({ isSaved: true });
        });

        it('should return a 401 status code when a user with no token checks if a cafe is saved', async () => {
            //Act
            const res = await testServer
                .get(`/user/isCafeSaved/${testCafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });

        it('should return a 200 status code and a message that the cafe is not saved when a user checks if a cafe is saved that is not added', async () => {
            //Act
            const res = await testServer
                .get(`/user/isCafeSaved/${testCafeData[1]._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            const parsedResponse = JSON.parse(res.text);
            expect(parsedResponse).to.deep.equal({ isSaved: false });
        });
    });
    describe(`PUT request to /user/avatar`, () => {
        // 1x1 transparent PNG
        const pngBuffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");
        const uploadedAvatars = [];

        after(() => {
            uploadedAvatars.forEach((avatar) => {
                fs.rmSync(path.join(avatarsDir, path.basename(avatar)), { force: true });
            });
        });

        it('should return a 200 status code and the new avatar path when a valid image is uploaded', async () => {
            //Act
            const res = await testServer
                .put('/user/avatar')
                .set('Authorization', `Bearer ${token}`)
                .attach('avatar', pngBuffer, { filename: 'avatar.png', contentType: 'image/png' });

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.equals('Avatar updated');
            expect(res.body.avatar).to.match(/^\/uploads\/avatars\/.+\.png$/);
            uploadedAvatars.push(res.body.avatar);
            expect(fs.existsSync(path.join(avatarsDir, path.basename(res.body.avatar)))).to.be.true;
        });

        it('should serve the uploaded avatar and delete the previous one when the avatar is replaced', async () => {
            //Arrange
            const previousAvatar = uploadedAvatars[uploadedAvatars.length - 1];

            //Act
            const res = await testServer
                .put('/user/avatar')
                .set('Authorization', `Bearer ${token}`)
                .attach('avatar', pngBuffer, { filename: 'avatar.png', contentType: 'image/png' });
            uploadedAvatars.push(res.body.avatar);

            const imageRes = await testServer.get(res.body.avatar);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body.avatar).to.not.equal(previousAvatar);
            expect(imageRes).to.have.status(200);
            expect(fs.existsSync(path.join(avatarsDir, path.basename(previousAvatar)))).to.be.false;
        });

        it('should return a 400 status code when no file is uploaded', async () => {
            //Act
            const res = await testServer
                .put('/user/avatar')
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('No file uploaded');
        });

        it('should return a 400 status code when a non-image file is uploaded', async () => {
            //Act
            const res = await testServer
                .put('/user/avatar')
                .set('Authorization', `Bearer ${token}`)
                .attach('avatar', Buffer.from('not an image'), { filename: 'avatar.txt', contentType: 'text/plain' });

            //Assert
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Only JPEG, PNG or WEBP images are allowed');
        });

        it('should return a 400 status code when the image is larger than 2MB', async () => {
            //Act
            const res = await testServer
                .put('/user/avatar')
                .set('Authorization', `Bearer ${token}`)
                .attach('avatar', Buffer.alloc(2 * 1024 * 1024 + 1), { filename: 'big.png', contentType: 'image/png' });

            //Assert
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Avatar must be 2MB or smaller');
        });

        it('should return a 401 status code when a user with no token uploads an avatar', async () => {
            //Act
            const res = await testServer
                .put('/user/avatar')
                .attach('avatar', pngBuffer, { filename: 'avatar.png', contentType: 'image/png' });

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });
    });
});
