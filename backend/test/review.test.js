import { expect } from "chai";

import { userData, cafeData, reviewData, testReviewData } from "./data/testData.js";
import { setupDatabase, initialiseSetup } from "./testSetup.js";




const { wellFormedReviewData, reviewNoName } = testReviewData;

describe("Testing Requests on Review Collection", () => {
    let token;
    let userId;

    const testServer = initialiseSetup();

    before(async () => {
        ({ userId, token } = await setupDatabase(userData, cafeData));
    });

  
    describe(`POST request to /review/:cafeId/add-review`, () => {
        it('should return a 201 status code and the review when a well formed review is sent', async () => {
            //Act
            const res = await testServer
                .post(`/review/${cafeData[0]._id}/add-review`)
                .set('Authorization', `Bearer ${token}`)
                .send(wellFormedReviewData);

            //Assert
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').that.equals('Review added successfully');
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('review');
            expect(res.body.review).to.have.property('name').that.equals(wellFormedReviewData.name);
            expect(res.body.review).to.have.property('description').that.equals(wellFormedReviewData.description);
        });

        it(`should return a 400 status code when a review with no name is sent`, async () => {
            //Act
            const res = await testServer
                .post(`/review/${cafeData[1]._id}/add-review`)
                .set('Authorization', `Bearer ${token}`)
                .send(reviewNoName);

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Review failed');
        });

        it('should return a 401 status code when no token is sent', async () => {
            //Act
            const res = await testServer
                .post(`/review/${cafeData[0]._id}/add-review`)
                .send(wellFormedReviewData);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });
    });
});