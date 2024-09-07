import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import RegisterForm from "../../../components/authentication/RegisterForm.jsx";
import { register } from "../../../services/auth.service.jsx";

jest.mock("../../../services/auth.service", () => ({
    register: jest.fn(),
  }));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("js-cookie", () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  }));

  describe("RegisterForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // jest.useFakeTimers();
        jest.spyOn(console, 'error').mockImplementation((message) => {
            const msg = String(message);
          if (msg.includes('Not implemented: navigation')) {
            // Suppress this specific error
            return;
          }
          // Otherwise, log the error
          console.error(message);
        });
      });

      afterEach(() => {
        console.error.mockRestore();
      });

      describe("Navigation tests", () => {
        it("should re-route to the homepage if the user is already logged in", async () => {
            
            Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");
    
            render(<RegisterForm />);
    
            await waitFor(() => {
                expect(mockRouterPush).toHaveBeenCalledWith("/");
            })
        });
     });

      

     describe("Form submission tests", () => {
        it("should register the user with the right data and route to the home page", async () => {
            
            //Arrange
            const testEmail = "test@example.com";
            const testPassword = "Test1234";

            register.mockResolvedValueOnce({ message: "Registered successfully" });

            render(<RegisterForm />);

            //Simulate user input
            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);
            
            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, testPassword);

            //Act
            const submitButton = screen.getByRole("button", { name: /Register/i });
            await userEvent.click(submitButton);

            //Assert
            await waitFor(() => {
                expect(register).toHaveBeenCalledWith(testEmail, testPassword);
                expect(screen.getByText(/Registered successfully./i)).toBeInTheDocument();
                expect(mockRouterPush).toHaveBeenCalledWith("/");
            });
        });  
        
        it("should display an error message if the registration fails due to a short password", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const testEmail = "test@example.com";
            const shortPassword = "123";

            register.mockRejectedValueOnce(new Error("Password must be at least 6 characters long and must contain at least one letter and one number"));

            render(<RegisterForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);
            
            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, shortPassword);

            //Act
            const submitButton = screen.getByRole("button", { name: /Register/i });
            await userEvent.click(submitButton);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/Password must be at least 6 characters long and must contain at least one letter and one number/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();  
                // expect(register).toHaveBeenCalledWith(testEmail, shortPassword);
            });
        });

        it("should display an error message if the registration fails due to an existing email", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const existingEmail = "test@gmail.com"
            const testPassword = "Test1234";

            register.mockRejectedValueOnce(new Error("A user with this email already exists"));

            render(<RegisterForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, existingEmail);

            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, testPassword);

            //Act
            const submitButton = screen.getByRole("button", { name: /Register/i });
            await userEvent.click(submitButton);

            //Assert
            await waitFor(() => {
                expect(screen.getByText(/A user with this email already exists/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();
            });
        });

        it("should display a network error message if the registration fails due to a network error", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const testEmail = "test@gmail.com";

            register.mockRejectedValueOnce(new Error("Network Error"));

            render(<RegisterForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);

            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, "Test1234");

            //Act
            const submitButton = screen.getByRole("button", { name: /Register/i });
            await userEvent.click(submitButton);

            //Assert
            await waitFor(() => {
                expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();
            });
        });

        it("should display a generic error message if the registration fails for an unknown reason", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const testEmail = "test@gmail.com";
            const testPassword = "Test1234";

            register.mockRejectedValueOnce(new Error("An error occurred during registration"));

            render(<RegisterForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);

            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, testPassword);

            //Act
            const submitButton = screen.getByRole("button", { name: /Register/i });
            await userEvent.click(submitButton);
            
            //Assert
            await waitFor(() => {
                expect(screen.getByText(/An error occurred during registration/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();
            });
        });
     }); 
  });
