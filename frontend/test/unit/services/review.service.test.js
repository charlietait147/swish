import axios from "axios";
import { addReview, deleteReview, editReview } from "../../../services/review.service.jsx";
import { testReviewData, filteredReviewData } from "../../data/testReviewData.js";

import Cookies from "js-cookie";

jest.mock("axios");

describe("ReviewServiceTests", () => {

    describe("add review service tests", () => {
        it('1 - should actually make the POST request to the /reviews endpoint with the right data', async () => {
          // Arrange
          const fakeToken = 'fakeToken123';
          Cookies.get = jest.fn().mockReturnValue(fakeToken); // Mock the Cookies.get method to return the fake token
          axios.post.mockResolvedValueOnce({ data: { message: 'Review added successfully' }, status: 201 });
      
          // Act
          const response = await addReview(testReviewData.cafe, filteredReviewData);
      
          // Assert
          expect(axios.post).toHaveBeenCalledWith(
            `http://localhost:3000/review/${testReviewData.cafe}/add-review`, 
            filteredReviewData,
            {
              headers: {
                Authorization: `Bearer ${fakeToken}`,
                "Content-Type": "multipart/form-data",
              }
            }
          );
          expect(response).toEqual({ message: 'Review added successfully' });
        });
      
        it('2 - should throw an error if the request fails', async () => {
          // Arrange
          axios.post.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
      
          // Act
          const response = addReview(testReviewData.cafe, filteredReviewData);
      
          // Assert
          await expect(response).rejects.toThrow('fakeError');
        });
      });

      it('3 - should have an unsuccesful request to the /reviews endpoint when there is no token provided', async () => {
        // Arrange
        const expectedMessage = "No token found. Please log in.";
        Cookies.get = jest.fn().mockReturnValue(null); 
      
        // Act & Assert
        await expect(addReview(testReviewData.cafe, filteredReviewData)).rejects.toThrow(expectedMessage);
      });

    describe("edit review service tests", () => {
            it('4 - should actually make the PUT request to the /reviews/:reviewId endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken); // Mock the Cookies.get method to return the fake token
            axios.put.mockResolvedValueOnce({ data: { message: 'Review edited successfully' }, status: 200 });
        
            // Act
            const response = await editReview(testReviewData.id, filteredReviewData.name, filteredReviewData.description);
        
            // Assert
            expect(axios.put).toHaveBeenCalledWith(
                `http://localhost:3000/review/edit-review/${testReviewData.id}`, 
                { name: filteredReviewData.name, description: filteredReviewData.description },
                {
                headers: {
                    Authorization: `Bearer ${fakeToken}`,
                }
                }
            );
            expect(response).toEqual({ message: 'Review edited successfully' });
            });
        
            it('5 - should throw an error if the request fails', async () => {
            // Arrange
            axios.put.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
        
            // Act
            const response = editReview(testReviewData.id, filteredReviewData.name, filteredReviewData.description);
        
            // Assert
            await expect(response).rejects.toThrow('fakeError');
            });
        });

    describe("delete review service tests", () => {
            it('6 - should actually make the DELETE request to the /reviews/:reviewId endpoint with the right data', async () => {
            // Arrange
            const fakeToken = 'fakeToken123';
            Cookies.get = jest.fn().mockReturnValue(fakeToken);
            axios.delete.mockResolvedValueOnce({ data: { message: 'Review deleted successfully' }, status: 200 });

            // Act
            const response = await deleteReview(testReviewData.id);

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(
                `http://localhost:3000/review/delete-review/${testReviewData.id}`,
                {
                headers: {
                    Authorization: `Bearer ${fakeToken}`,
                }
                }
            );
            expect(response).toEqual({ message: 'Review deleted successfully' });
            });

            it('7 - should throw an error if the request fails', async () => {
            // Arrange
            axios.delete.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });

            // Act
            const response = deleteReview(testReviewData.id);

            // Assert
            await expect(response).rejects.toThrow('fakeError');
            });

            it('8 - should have an unsuccesful request to the /review/delete-review/:reviewId endpoint when there is no token provided', async () => {
            // Arrange
            const expectedMessage = "No token found. Please log in.";
            Cookies.get = jest.fn().mockReturnValue(null);
            
            // Act & Assert
            await expect(deleteReview(testReviewData.id)).rejects.toThrow(expectedMessage);
            });

            it('9 - should have an unsuccesful request to the /review/delete-review/:reviewId endpoint when there is no reviewId provided', async () => {
            // Arrange
            const expectedMessage = "No review ID provided";
            const reviewId = null;

            // Act & Assert
            await expect(deleteReview(reviewId)).rejects.toThrow(expectedMessage);
            });
    });
});
