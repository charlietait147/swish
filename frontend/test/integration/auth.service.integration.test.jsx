/**
 * @jest-environment node
 */
// Requires the backend running at NEXT_API_URL (default http://localhost:3000). Run with `npm run test:integration`.
import { register, login, updatePassword } from "../../services/auth.service.jsx";


describe("Integration Tests: Auth Service", () => {

    it('1 - should make the POST request to the /register endpoint with the correct data', async () => {
        // Arrange
        const user = { email: "test@example.com", password: "Test1234" };

        // Act
        const response = await register(user.email, user.password);

        // Assert
        expect(response).toHaveProperty("token");
        expect(response.token).toBeDefined();
        expect(response).toHaveProperty("user");
       
    });

    it('2 - should handle registration errors', async () => {
        // Arrange
        const user = { email: "test@example.com", password: "short" };
        
        try {
            // Act
            await register(user.email, user.password);
        } catch (error) {
            // Assert
            expect(error.message).toBe("Password must be at least 8 characters long and must contain at least one letter and one number");
        }
    });

    it('3 - should make the POST request to the /login endpoint with the correct data', async () => {
        // Arrange
        const user = { email: "test@example.com", password: "Test1234" };

        // Act
        const response = await login(user.email, user.password);

        // Assert
        expect(response).toHaveProperty("token");
        expect(response.token).toBeDefined();
        expect(response).toHaveProperty("user");
        expect(response.user.email).toBe(user.email);
        expect(response.message).toBe("User logged in successfully");
    });

    it('4 - should handle email login error', async () => {
        // Arrange
        const user = { email: "wrongemail@example.com", password: "Test1234" };

        try {
            // Act
            await login(user.email, user.password);
        }
        catch (error) {
            // Assert
            expect(error.message).toBe("Invalid email or password");
        }
    });

    it('5 - should handle password login error', async () => {
        // Arrange
        const user = { email: "test@example.com", password: "wrongpassword" };

        try {
            // Act
            await login(user.email, user.password);
        } catch (error) {
            // Assert
            expect(error.message).toBe("Invalid email or password");
        }
    });

});