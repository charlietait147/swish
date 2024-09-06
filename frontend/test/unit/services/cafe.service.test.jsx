import axios from "axios";
import { fetchCafes, fetchCafe } from "../../../services/cafe.service.jsx";

import { testCafeData } from "../../data/testCafeData.js";

jest.mock("axios");

describe("CafeServiceTests", () => {

    describe("fetch cafes tests", () => {

        it('1 - should actually make the GET request to the /cafes endpoint with the right data', async () => {
            // Arrange
            axios.get.mockResolvedValueOnce({ data: testCafeData, status: 200 });
            

            //Act
            const response = await fetchCafes();

            //Asset
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/cafes`);
            expect(response).toEqual(testCafeData);
        });

        it('2 - should throw an error if the request fails', async () => {
            // Arrange
            axios.get.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = fetchCafes();

            // Assert
            await expect(response).rejects.toThrow('fakeError');
        });
    });

    describe("fetch cafe tests", () => {
            
            it('3 - should actually make the GET request to the /cafes/:cafeId endpoint with the right data', async () => {
                // Arrange
                const cafeId = 1;
                axios.get.mockResolvedValueOnce({ data: testCafeData[0], status: 200 });
    
                // Act
                const response = await fetchCafe(cafeId);
    
                // Assert
                expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/cafes/${cafeId}`);
                expect(response).toEqual(testCafeData[0]);
            });
    
            it('4 - should throw an error if the request fails', async () => {
                // Arrange
                const cafeId = 1;
                axios.get.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
    
                // Act
                const response = fetchCafe(cafeId);
    
                // Assert
                await expect(response).rejects.toThrow('fakeError');
            });
    
            it('5 - should throw an error if no cafeId is provided', async () => {
                // Arrange
                const cafeId = null;
    
                // Act
                const response = fetchCafe(cafeId);
    
                // Assert
                await expect(response).rejects.toThrow('No cafeId provided');
            });
        });
});

