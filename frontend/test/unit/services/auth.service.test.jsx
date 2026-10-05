import axios from "axios";
import Cookies from "js-cookie";
import { register, login, updatePassword, forgotPassword, resetPassword } from "../../../services/auth.service.jsx";
import { user, shortUserPassword, userWithInvalidEmail, newPassword } from "../../data/testUserData.js";

jest.mock("axios");

describe("AuthServiceTests", () => {

    describe("register service tests", () => {
       
            it('1 - should actually make the POST request to the /register endpoint with the right data', async () => {
                // Arrange
                axios.post.mockResolvedValueOnce({ data: { token: 'fakeToken' }, status: 201 });
                
                // Act
                const response = await register(user.email, user.password);
                
                // Assert
                expect(axios.post).toHaveBeenCalledWith(`http://localhost:3000/user/register`, {
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
            expect(axios.post).toHaveBeenCalledWith(`http://localhost:3000/user/login`, {
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

    describe("updatePassword service tests", () => {

        it('12 - should actually make the PUT request to the /update-password endpoint with the right data', async () => {
            // Arrange
            axios.put.mockResolvedValueOnce({ data: { token: 'fakeToken' }, status: 200 });
            
            // Act
            const response = await updatePassword(newPassword);
            
            // Assert
            expect(axios.put).toHaveBeenCalledWith(`http://localhost:3000/user/update-password`, {
              newPassword: newPassword, 
            }, {
              headers: {
                Authorization: expect.stringContaining('Bearer'), // Ensure the Authorization header is passed
              },
            });
            expect(response).toEqual({ token: 'fakeToken' }); // Make sure the function returns the expected data
          });
    
        it('13 - should throw an error if the request fails', async () => {
            // Arrange
            axios.put.mockRejectedValueOnce({ response: { data: 'fakeError', status: 400 } });
            
            // Act
            const response = updatePassword(user.password);
            
            // Assert
            await expect(response).rejects.toThrow('fakeError');
        });
    
        it("14 - should have an unsuccessful request to the /update-password endpoint when there is no token provided", async () => {
            // Arrange
            const expectedMessage = "An error occurred during password update";
            axios.put.mockRejectedValueOnce(new Error(expectedMessage));
    
            // Assert
            await expect(updatePassword(user.password)).rejects.toThrow(expectedMessage);
        });
    
        it("15 - should return an error when updating password with a short password", async () => {
            // Arrange
            const expectedErrorMessage = "Password must be at least 6 characters long and must contain at least one letter and one number"; 
            axios.put.mockRejectedValueOnce({
                response: {
                    status: 400,
                    data: expectedErrorMessage, // Simulate the error message returned by the server
                },
            });
        
            // Act & Assert
            await expect(updatePassword(shortUserPassword.password)).rejects.toThrow(expectedErrorMessage);
        });
    
        it("16 - should store the new token returned after updating the password", async () => {
            // Arrange
            const setCookie = jest.spyOn(Cookies, "set");
            axios.put.mockResolvedValueOnce({ data: { token: 'newToken' }, status: 200 });

            // Act
            await updatePassword(newPassword);

            // Assert
            expect(setCookie).toHaveBeenCalledWith("token", "newToken", { expires: 1, sameSite: "Strict" });
            setCookie.mockRestore();
        });

        it("17 - should throw the first validation message when the API returns a list of errors", async () => {
            // Arrange
            axios.put.mockRejectedValueOnce({ response: { status: 400, data: ["New password must be at least 8 characters"] } });

            // Act & Assert
            await expect(updatePassword(shortUserPassword.password)).rejects.toThrow("New password must be at least 8 characters");
        });
    });

    describe("forgotPassword service tests", () => {
        it("18 - should make the POST request to the /forgot-password endpoint with the email", async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: { message: 'fakeMessage' }, status: 200 });

            // Act
            const response = await forgotPassword(user.email);

            // Assert
            expect(axios.post).toHaveBeenCalledWith(`http://localhost:3000/user/forgot-password`, { email: user.email });
            expect(response).toEqual({ message: 'fakeMessage' });
        });

        it("19 - should throw an error if the request fails", async () => {
            // Arrange
            axios.post.mockRejectedValueOnce(new Error("Network Error"));

            // Act & Assert
            await expect(forgotPassword(user.email)).rejects.toThrow("Network Error");
        });
    });

    describe("resetPassword service tests", () => {
        it("20 - should make the POST request with the token and sign the user in", async () => {
            // Arrange
            const setCookie = jest.spyOn(Cookies, "set");
            axios.post.mockResolvedValueOnce({ data: { message: 'Password has been reset successfully', token: 'newToken' }, status: 200 });

            // Act
            const response = await resetPassword("resetToken", newPassword);

            // Assert
            expect(axios.post).toHaveBeenCalledWith(`http://localhost:3000/user/reset-password/resetToken`, { newPassword });
            expect(response.token).toBe('newToken');
            expect(setCookie).toHaveBeenCalledWith("token", "newToken", { expires: 1, sameSite: "Strict" });
            setCookie.mockRestore();
        });

        it("21 - should throw the error message returned by the API", async () => {
            // Arrange
            axios.post.mockRejectedValueOnce({ response: { status: 400, data: { error: "Token is invalid or has expired" } } });

            // Act & Assert
            await expect(resetPassword("badToken", newPassword)).rejects.toThrow("Token is invalid or has expired");
        });

        it("22 - should throw the validation message when the new password is too weak", async () => {
            // Arrange
            axios.post.mockRejectedValueOnce({ response: { status: 400, data: { errors: ["New password must be at least 8 characters"] } } });

            // Act & Assert
            await expect(resetPassword("resetToken", shortUserPassword.password)).rejects.toThrow("New password must be at least 8 characters");
        });
    });
});
