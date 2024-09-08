import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import LoginForm from "../../../components/authentication/LoginForm.jsx";
import { login } from "../../../services/auth.service.jsx";

jest.mock("../../../services/auth.service", () => ({
    login: jest.fn(),
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

  describe("LoginForm Component", () => {
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
    
            render(<LoginForm />);
    
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
    
                login.mockResolvedValueOnce({ message: "Logging in ..." });
    
                render(<LoginForm />);
    
                //Simulate user input
                const emailInput = screen.getByLabelText(/Email/i);
                await userEvent.type(emailInput, testEmail);
                
                const passwordInput = screen.getByLabelText(/password/i);
                await userEvent.type(passwordInput, testPassword);
    
                //Act
                const submitButton = screen.getByRole("button", { name: /Sign in/i });
                await userEvent.click(submitButton);
    
                //Assert
                await waitFor(() => {
                    expect(login).toHaveBeenCalledWith(testEmail, testPassword);
                    expect(screen.getByText(/Logging in .../i)).toBeInTheDocument();
                    expect(mockRouterPush).toHaveBeenCalledWith("/");
                });
            });

            it("should display an error message when the user submits an invalid email address", async () => {
                Cookies.get.mockReturnValue(null);
                //Arrange
                const testEmail = "test@fakeexample.com";
                const testPassword = "Test1234";

                login.mockRejectedValueOnce(new Error("A user with this email does not exist"));

                render(<LoginForm />);

                //Simulate user input
                const emailInput = screen.getByLabelText(/Email/i);
                await userEvent.type(emailInput, testEmail);

                const passwordInput = screen.getByLabelText(/password/i);
                await userEvent.type(passwordInput, testPassword);

                //Act
                const submitButton = screen.getByRole("button", { name: /Sign in/i });
                await userEvent.click(submitButton);

                //Assert
                await waitFor(() => {
                    expect(screen.getByText(/A user with this email does not exist/i)).toBeInTheDocument();
                    expect(mockRouterPush).not.toHaveBeenCalled();
                });
            });

            it("should display an error message when the user submits an invalid password", async () => {
                Cookies.get.mockReturnValue(null);
                //Arrange
                const testEmail = "test@example.com";
                const testPassword = "badpassword";

                login.mockRejectedValueOnce(new Error("Invalid password"));

                render(<LoginForm />);

                //Simulate user input
                const emailInput = screen.getByLabelText(/Email/i);
                await userEvent.type(emailInput, testEmail);

                const passwordInput = screen.getByLabelText(/password/i);
                await userEvent.type(passwordInput, testPassword);

                //Act
                const submitButton = screen.getByRole("button", { name: /Sign in/i });
                await userEvent.click(submitButton);

                //Assert
                await waitFor(() => {
                    expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
                    expect(mockRouterPush).not.toHaveBeenCalled();
                });
            });


        it("should display a network error message if the login fails due to a network error", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const testEmail = "test@gmail.com";

            login.mockRejectedValueOnce(new Error("Network Error"));

            render(<LoginForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);

            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, "Test1234");

            //Act
            const submitButton = screen.getByRole("button", { name: /Sign in/i });
            await userEvent.click(submitButton);

            //Assert
            await waitFor(() => {
                expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();
            });
        });

        it("should display a generic error message if the login fails for an unknown reason", async () => {
            Cookies.get.mockReturnValue(null);
            //Arrange
            const testEmail = "test@gmail.com";
            const testPassword = "Test1234";

            login.mockRejectedValueOnce(new Error("An error occurred during login"));

            render(<LoginForm />);

            const emailInput = screen.getByLabelText(/Email/i);
            await userEvent.type(emailInput, testEmail);

            const passwordInput = screen.getByLabelText(/password/i);
            await userEvent.type(passwordInput, testPassword);

            //Act
            const submitButton = screen.getByRole("button", { name: /Sign in/i });
            await userEvent.click(submitButton);
            
            //Assert
            await waitFor(() => {
                expect(screen.getByText(/An error occurred during login/i)).toBeInTheDocument();
                expect(mockRouterPush).not.toHaveBeenCalled();
            });
        });
     });
  });
