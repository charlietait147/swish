import { expect } from 'chai';
import Cafe from '../src/models/cafe.model.js';
import { setupDatabase, initialiseSetup } from "./testSetup.js";
import { userData, testCafeData, reviewData } from "./data/testData.js";
import { updateCafes } from '../upsert-script.js';
import Review from '../src/models/review.model.js';

 
describe('Cafe Upsert', () => {
    const testServer = initialiseSetup();

    before(async () => {
        await setupDatabase(userData, testCafeData, reviewData);
    });

    it('should upsert cafes into the database', async () => {
        await updateCafes();

        const cafes = await Cafe.find({});
        console.log(cafes);
        expect(cafes).to.have.lengthOf(testCafeData.length);

        testCafeData.forEach((cafe) => {
            const dbCafe = cafes.find(dbCafe => dbCafe.name === cafe.name);
            expect(dbCafe).to.exist;
            expect(dbCafe.location).to.equal(cafe.location);
            expect(dbCafe.description).to.equal(cafe.description);
            // Add other fields to compare as needed, except `reviews`
        });
    });

    it('should not modify existing reviews during upsert', async () => {
        const cafeName = testCafeData[0].name;
        const initialReview = new Review({ user: reviewData._id, cafe: reviewData._id, name: reviewData.name, description: reviewData.description });

        await initialReview.save();

        // Simulate a review added to the cafe before upsert
        await Cafe.findOneAndUpdate({ name: cafeName }, { $push: { reviews: initialReview._id } });

        await updateCafes();

        const updatedCafe = await Cafe.findOne({ name: cafeName }).populate('reviews');
        expect(updatedCafe.reviews).to.have.lengthOf(1);
        expect(updatedCafe.reviews[0].name).to.equal('Test Review');
        expect(updatedCafe.reviews[0].description).to.equal('Test Description');
    });

    //More tests as needed
});