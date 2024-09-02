import axios from "axios";
import { addCafe, getCafes, isCafeSaved, fetchUserData, deleteSavedCafe } from "../../services/user.service.jsx";
import { testCafeData } from "../data/testCafeData.js";
import { testUserData } from "../data/testUserData.js";

import Cookies from "js-cookie";    

jest.mock("axios");

describe("UserServiceTests", () => {

    describe("add cafe service tests", () => {
        it('1 - should actually make the POST request to the /user/add-cafe/:cafeId endpoint with the right data', async () => {
          // Arrange
          const fakeToken = 'fakeToken123';
          Cookies.get = jest.fn().mockReturnValue(fakeToken);

          axios.post.mockResolvedValueOnce({ data: { message: 'Cafe added successfully' }, status: 201 });

          // Act
          const response = await addCafe(testCafeData[0]._id);

          // Assert
          expect(axios.post).toHaveBeenCalledWith(
                `http://localhost:4000/user/add-cafe/${testCafeData[0]._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${fakeToken}`,
                    },
                }
            );
            expect(response).toEqual({ message: 'Cafe added successfully' });
        });

        it('2 - should throw an error if the request fails', async () => {
            // Arrange
            axios.post.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = addCafe(testCafeData[0]._id);

            // Assert
            await expect(response).rejects.toThrow('fakeError');
        });

        it('3 - should have an unsuccesful request to the /user/add-cafe/:cafeId endpoint when there is no token provided', async () => {
            // Arrange
            const expectedMessage = "No token found. Please log in.";
            Cookies.get = jest.fn().mockReturnValue(null);

            // Act & Assert
            await expect(addCafe(testCafeData[0]._id)).rejects.toThrow(expectedMessage);
        });
    })

    describe("get cafes service tests", () => {
        it('4 - should actually make the GET request to the /user/cafes endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);

            axios.get.mockResolvedValueOnce({ data: testCafeData, status: 200 });

            // Act
            const response = await getCafes();

            // Assert
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/user/cafes`, {
                headers: {
                    Authorization: `Bearer ${fakeToken}`,
                },
            });
            expect(response).toEqual(testCafeData);
        });
        it('5 - should throw an error if the request fails', async () => {
            // Arrange
            axios.get.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = getCafes();

            // Assert
            await expect(response).rejects.toThrow('fakeError');
        });
    });

    describe("is cafe saved service tests", () => {
        it('6 - should actually make the GET request to the /user/isCafeSaved/:cafeId endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);
    
            axios.get.mockResolvedValueOnce({ data: { isSaved: true }, status: 200 });
    
            // Act
            const response = await isCafeSaved(testCafeData[0]._id);
    
            // Assert
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/user/isCafeSaved/${testCafeData[0]._id}`, {
                headers: {
                    Authorization: `Bearer ${fakeToken}`,
                },
            });
            expect(response).toEqual(true);  // Expecting the isSaved boolean value
        });

        it('7 - should throw an error if the request fails', async () => {
            // Arrange
            axios.get.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = isCafeSaved(testCafeData[0]._id);

            // Assert
            await expect(response).rejects.toThrow('fakeError');
        });

        it('8 - should have an unsuccesful request to the /user/isCafeSaved/:cafeId endpoint when there is no token provided', async () => {
            // Arrange
            const expectedMessage = "No token found. Please log in.";
            Cookies.get = jest.fn().mockReturnValue(null);

            // Act & Assert
            await expect(isCafeSaved(testCafeData[0]._id)).rejects.toThrow(expectedMessage);
        });


        it('9 - should return false if the cafe is not saved', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);

            axios.get.mockResolvedValueOnce({ data: { isSaved: false }, status: 200 });

            // Act
            const response = await isCafeSaved(testCafeData[0]._id);

            // Assert
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/user/isCafeSaved/${testCafeData[0]._id}`, {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
                },
            });
            expect(response).toEqual(false);  // Expecting the isSaved boolean value to be false
        });
    });

    describe("fetch user data service tests", () => {
        it('10 - should actually make the GET request to the /user endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);

            axios.get.mockResolvedValueOnce({ data: testUserData, status: 200 });

            // Act
            const response = await fetchUserData();

            // Assert
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/user`, {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
                },
            });
            expect(response).toEqual(testUserData);
            });

        it('11 - should throw an error if the request fails', async () => {
            // Arrange
            axios.get.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = fetchUserData();

            // Assert
            await expect(response).rejects.toThrow('fakeError');
            });
        });

    describe('delete saved cafe service tests', () => {
        it('12 - should actually make the DELETE request to the /user/:cafeId endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);

            axios.delete.mockResolvedValueOnce({ data: { message: 'Cafe deleted successfully' }, status: 200 });

            // Act
            const response = await deleteSavedCafe(testCafeData[0]._id);

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(
                `http://localhost:4000/user/${testCafeData[0]._id}`,
                {
                headers: {
                    Authorization: `Bearer ${fakeToken}`,
                }
                }
            );
            expect(response).toEqual({ message: 'Cafe deleted successfully' });
            });

        it('13 - should throw an error if the request fails', async () => {
            // Arrange
            axios.delete.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = deleteSavedCafe(testCafeData[0]._id);

            // Assert
            await expect(response).rejects.toThrow('fakeError');
            });
    });
});