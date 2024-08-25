import { expect } from 'chai';
import sinon from 'sinon';

import { removeCafe } from '../delete-cafe.js';
import { setupDatabase, initialiseSetup } from "./testSetup.js";
import { cafeDataToBeDeleted, userData } from "./data/testData.js";
import Cafe from '../src/models/cafe.model.js';


describe('Cafe Deletion', () => {

    const testServer = initialiseSetup();

    before(async () => {
        await setupDatabase(userData, cafeDataToBeDeleted, []);
    });

    

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

    it('should not delete a cafe from the database when no name is provided', async () => {
        const result = await removeCafe('');

        expect(result).to.be.false;
    });

    it('should log a message when a cafe is deleted', async () => {
        const cafeName = cafeDataToBeDeleted[1].name;

        const logSpy = sinon.spy(console, 'log'); // Spy on console.log
    
        await removeCafe(cafeName);
    
        expect(logSpy.calledWith(`Cafe '${cafeName}' removed from the database.`)).to.be.true;
    
        logSpy.restore(); // Restore the original function
    });

    it('should log a message when a cafe is not found', async () => {
        const cafeName = 'Non-existent Cafe';

        const logSpy = sinon.spy(console, 'log'); // Spy on console.log
    
        await removeCafe(cafeName);
    
        expect(logSpy.calledWith(`Cafe '${cafeName}' not found in the database.`)).to.be.true;
    
        logSpy.restore(); // Restore the original function
    })

    it('should log a message when no cafe name is provided', async () => {
        const logSpy = sinon.spy(console, 'log'); // Spy on console.log
    
        await removeCafe('');
    
        expect(logSpy.calledWith('No cafe name provided.')).to.be.true;
    
        logSpy.restore(); // Restore the original function
    })
})

