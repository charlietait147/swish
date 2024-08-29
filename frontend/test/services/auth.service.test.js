import axios from "axios";
import { register, login, updatePassword } from "../../services/auth.service.jsx";
import { user, shortUserPassword, userWithInvalidEmail } from "../data/testUserData.js";

jest.mock("axios");

describe("AuthServiceTests", () => {

    describe("register service tests", () => {
       
        it('1 - should actually make the POST request to the /register endpoint with the right data', async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: { token: 'fakeToken' }, status: 201 });
            
            // Act
            const response = await register(user.email, user.password);
            
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`http://localhost:4000/user/register`, {
              email: user.email,
              password: user.password,
            });
            expect(response).toEqual({ token: 'fakeToken' });
          });

            it('2 - should throw an error if the request fails', async () => {
                // Arrange
                axios.post.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
                
                // Act
                const response = register(user.email, user.password);
                
                // Assert
                await expect(response).rejects.toThrow('fakeError');
            });

            it("3 - should have an unsuccesful request to the /register endpoint when there is no token provided", async () => {
                //Arrange
                const expectedMessage = "An error occurred during registration";
                axios.post.mockRejectedValueOnce(new Error());

                //Assert
                await expect(register(user.username, user.password)).rejects.toThrow(expectedMessage);
            }
            );

            it("4 - should return an error when registering with an existing email", async () => {
                // Arrange
                const expectedErrorMessage = "A user with this email already exists"; // Assuming this is the error message your backend sends
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 400,
                        data: expectedErrorMessage, // This simulates the error message returned by the server
                    },
                });
            
                // Act & Assert
                await expect(register(user.email, user.password)).rejects.toThrow(expectedErrorMessage);
            });

            it("5 - should return an error when registering with a short password", async () => {
                // Arrange
                const expectedErrorMessage = "Password must be at least 6 characters long and must contain at least one letter and one number"; // Assuming this is the error message your backend sends
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 400,
                        data: expectedErrorMessage, // This simulates the error message returned by the server
                    },
                });
            
                // Act & Assert
                await expect(register(shortUserPassword.email, shortUserPassword.password)).rejects.toThrow(expectedErrorMessage);
            });

            it("6 - should return an error when registering with an invalid email", async () => {
                // Arrange
                const expectedErrorMessage = "Please provide a valid email address"; // Assuming this is the error message your backend sends
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 400,
                        data: expectedErrorMessage, // This simulates the error message returned by the server
                    },
                });
            
                // Act & Assert
                await expect(register(userWithInvalidEmail.email, userWithInvalidEmail.password)).rejects.toThrow(expectedErrorMessage);
            });
    })

    describe("login service tests", () => {
        it('7 - should actually make the POST request to the /login endpoint with the right data', async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: { token: 'fakeToken' }, status: 201 });
            
            // Act
            const response = await login(user.email, user.password);
            
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`http://localhost:4000/user/login`, {
              email: user.email,
              password: user.password,
            });
            expect(response).toEqual({ token: 'fakeToken' });
          });

            it('8 - should throw an error if the request fails', async () => {
                // Arrange
                axios.post.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
                
                // Act
                const response = login(user.email, user.password);
                
                // Assert
                await expect(response).rejects.toThrow('fakeError');
            });

            it("9 - should have an unsuccesful request to the /login endpoint when there is no token provided", async () => {
                //Arrange
                const expectedMessage = "An error occurred during login";
                axios.post.mockRejectedValueOnce(new Error());

                //Assert
                await expect(login(user.username, user.password)).rejects.toThrow(expectedMessage);
            }
            );

            it("10 - should return an error when logging in with an invalid email", async () => {
                // Arrange
                const expectedErrorMessage = "A user with this email does not exist"; // Assuming this is the error message your backend sends
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 400,
                        data: expectedErrorMessage, // This simulates the error message returned by the server
                    },
                });
            
                // Act & Assert
                await expect(login(userWithInvalidEmail.email, userWithInvalidEmail.password)).rejects.toThrow(expectedErrorMessage);
            });

            it("11 - should return an error when logging in with an invalid password", async () => {
                // Arrange
                const expectedErrorMessage = "Invalid password"; // Assuming this is the error message your backend sends
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 400,
                        data: expectedErrorMessage, // This simulates the error message returned by the server
                    },
                });
            
                // Act & Assert
                await expect(login(user.email, user.password)).rejects.toThrow(expectedErrorMessage);
            });
    });
});
