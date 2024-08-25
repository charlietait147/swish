import { expect } from 'chai';

import { removeCafe } from '../delete-cafe.js';
import { setupDatabase, initialiseSetup } from "./testSetup.js";
import { cafeDataToBeDeleted } from "./data/testData.js";
import Cafe from '../src/models/cafe.model.js';


describe('Cafe Deletion', () => {

    before(async () => {
        await setupDatabase([], cafeDataToBeDeleted, []);
    });

    const testServer = initialiseSetup();

    it('should delete a cafe from the database when it exists', async () => {
        const cafeName = cafeDataToBeDeleted[0].name;
        const result = await removeCafe(cafeName);

        const cafe = await Cafe.findOne({ name: cafeName });
        expect(result).to.be.true;
        expect(cafe).to.be.null;
    });

    it('should not delete a cafe from the database when it does not exist', async () => {
        const cafeName = 'Non-existent Cafe';
        const result = await removeCafe(cafeName);

        const cafe = await Cafe.findOne({ name: cafeName });
        expect(result).to.be.false;
        expect(cafe).to.be.null;
    });
})

