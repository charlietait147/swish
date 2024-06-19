import { expect } from "chai";

import { userData, cafeData } from "./data/testData.js";

import { setupDatabase, initialiseSetup } from "./testSetup.js";

describe("Testing Requests on Cafe Collection", () => {

    const testServer = initialiseSetup();

    let token;
    let userId;

    before(async () => {
        ({ userId, token} = await setupDatabase(userData, cafeData, []));
    });

    describe(`GET request to /cafe`, () => {
        it('should return a 200 status code and all cafes when a request is made', async () => {
            //Act
            const res = await testServer
                .get('/cafes');

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(cafeData.length);
            res.body.forEach(cafe => {
                expect(cafe).to.have.property('_id');
                expect(cafe).to.have.property('name');
                expect(cafe).to.have.property('location');
                expect(cafe).to.have.property('description');
            });
        });
    });

    describe(`GET request to /cafe/:cafeId`, () => {
        it('should return a 200 status code and the requested cafe when a request is made', async () => {
            //Act
            const res = await testServer
                .get(`/cafes/${cafeData[0]._id}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id').that.equals(cafeData[0]._id);
            expect(res.body).to.have.property('name').that.equals(cafeData[0].name);
            expect(res.body).to.have.property('location').that.equals(cafeData[0].location);
            expect(res.body).to.have.property('description').that.equals(cafeData[0].description);
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



