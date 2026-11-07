import { expect } from "chai";

import { userData, testCafeData } from "./data/testData.js";

import { setupDatabase, initialiseSetup } from "./testSetup.js";
import Review from "../src/models/review.model.js";
import Cafe from "../src/models/cafe.model.js";
import User from "../src/models/user.model.js";

describe("Testing Requests on Cafe Collection", () => {

    const testServer = initialiseSetup();

    let token;
    let userId;

    before(async () => {
        ({ userId, token} = await setupDatabase(userData, testCafeData, []));
    });

    describe(`GET request to /cafe`, () => {
        it('should return a 200 status code and all cafes when a request is made', async () => {
            //Act
            const res = await testServer
                .get('/cafes');

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(testCafeData.length);
            res.body.forEach(cafe => {
                expect(cafe).to.have.property('_id');
                expect(cafe).to.have.property('name');
                expect(cafe).to.have.property('locations');
                expect(cafe).to.have.property('description');
            });
        });
    });

    describe(`GET request to /cafe/:cafeId`, () => {
        it('should return a 200 status code and the requested cafe when a request is made', async () => {
            //Act
            const res = await testServer
                .get(`/cafes/${testCafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id').that.equals(testCafeData[0]._id);
            expect(res.body).to.have.property('name').that.equals(testCafeData[0].name);
            expect(res.body).to.have.property('locations').that.deep.equals(testCafeData[0].locations);
            expect(res.body).to.have.property('description').that.equals(testCafeData[0].description);
        });

        it("should include each reviewer's avatar but none of their other details", async () => {
            //Arrange
            await User.updateOne({ _id: userId }, { $set: { avatar: '/uploads/avatars/test.jpg' } });
            const review = await Review.create({
                user: userId,
                cafe: testCafeData[0]._id,
                name: 'Test Review',
                description: 'Test Description',
                rating: 5,
            });
            await Cafe.updateOne({ _id: testCafeData[0]._id }, { $push: { reviews: review._id } });

            //Act
            const res = await testServer
                .get(`/cafes/${testCafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(200);
            const reviewer = res.body.reviews[0].user;
            expect(reviewer).to.have.property('avatar').that.equals('/uploads/avatars/test.jpg');
            expect(reviewer).to.not.have.property('email');
            expect(reviewer).to.not.have.property('password');
        });

        it('should return a 404 status code when a request is made with an invalid id', async () => {
            //Act
            const res = await testServer
                .get(`/cafes/60f1b6b5f3f9e4f4b8f3b3b8`);

            //Assert
            expect(res).to.have.status(404);
            expect(res.text).to.equal('Cafe not found');
        });
    });
});



