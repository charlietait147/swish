import { expect } from "chai";

import { userData, testCafeData, reviewData, testReviewData } from "./data/testData.js";
import { setupDatabase, initialiseSetup } from "./testSetup.js";




const { wellFormedReviewData, reviewNoName, reviewNoDescription } = testReviewData;

describe("Testing Requests on Review Collection", () => {
    let token;
    let userId;

    const testServer = initialiseSetup();

    before(async () => {
        ({ userId, token } = await setupDatabase(userData, testCafeData, reviewData));
    });

  
    describe(`POST request to /review/:cafeId/add-review`, () => {
        it('should return a 201 status code and the review when a well formed review is sent', async () => {
            //Act
            const res = await testServer
                .post(`/review/${testCafeData[0]._id}/add-review`)
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
                .post(`/review/${testCafeData[1]._id}/add-review`)
                .set('Authorization', `Bearer ${token}`)
                .send(reviewNoName);

            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Review failed');
        });

        it(`should return a 400 status code when a review with no description is sent`, async () => {
            //Act
            const res = await testServer
                .post(`/review/${testCafeData[1]._id}/add-review`)
                .set('Authorization', `Bearer ${token}`)
                .send(reviewNoDescription);
            
            //Assert
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Review failed');

        });

        it('should return a 401 status code when no token is sent', async () => {
            //Act
            const res = await testServer
                .post(`/review/${testCafeData[0]._id}/add-review`)
                .send(wellFormedReviewData);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });
    });

    describe(`PUT request to /review/:reviewId/edit-review`, () => {
        it('should return a 200 status code and the updated review when a review is edited', async () => {
            //Act
            const res = await testServer
                .put(`/review/edit-review/${reviewData._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Updated Review', description: 'Updated Description'});

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.equals('Review updated successfully');
            expect(res.body).to.have.property('review');
            expect(res.body.review).to.have.property('name').that.equals('Updated Review');
            expect(res.body.review).to.have.property('description').that.equals('Updated Description');
        });

        it('should return a 401 status code when no token is sent', async () => {
            //Act
            const res = await testServer
                .put(`/review/edit-review/${reviewData._id}`)
                .send({ name: 'Updated Review', description: 'Updated Description'});

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });

        it(`should return a 400 status code when a review that doesn't exist is edited`, async () => {
            //Act
            const res = await testServer
                .put(`/review/edit-review/60f1b6b5f3f9e4f4b8f3b3b7`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Updated Review', description: 'Updated Description'});

            //Assert
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error').that.equals('Review not found');
        });
    });

    describe(`DELETE request to /review/delete-review/:reviewId/`, () => {
        it('should return a 200 status code and a message when a review is deleted', async () => {
            //Act
            const res = await testServer
                .delete(`/review/delete-review/${reviewData._id}`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.equals('Review deleted successfully');
        });

        it('should return a 401 status code when no token is sent', async () => {
            //Act
            const res = await testServer
                .delete(`/review/delete-review/${reviewData._id}`);

            //Assert
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal('Authentication failed: No token provided');
        });

        it(`should return a 400 status code when a review that doesn't exist is deleted`, async () => {
            //Act
            const res = await testServer
                .delete(`/review/delete-review/60f1b6b5f3f9e4f4b8f3b3b7`)
                .set('Authorization', `Bearer ${token}`);

            //Assert
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error').that.equals('Review not found');
        });
    });
});