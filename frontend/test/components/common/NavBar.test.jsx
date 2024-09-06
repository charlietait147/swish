import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import NavBar from "../../../components/NavBar.jsx";

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

describe("NavBar Component", () => {
    beforeEach(() => {
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

  it("should render a Sign in link when the user is not logged in", () => {
    render(<NavBar />);

    const loginLink = screen.getByText(/Sign in/i);

    expect(loginLink).toBeInTheDocument();
  });

  it("should render a Sign Out link when the user is logged in", () => {
    Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

    render(<NavBar />);

    const signOutButton = screen.getByText(/Sign Out/i);

    expect(signOutButton).toBeInTheDocument();
  });

  it("should toggle the menu when the burger icon is clicked", async () => {
    // Render the NavBar component
    render(<NavBar />);

    // Initially, the menu should not be visible
    const menuList = screen.queryByRole("menu");
    expect(menuList).not.toBeInTheDocument(); // No menu initially

    // Find and click the burger menu icon
    const burgerIcon = screen.getByRole("button", { name: /burger menu/i });
    userEvent.click(burgerIcon);

    // Assert that the menu is visible
    await waitFor(() => {
        const visibleMenuList = screen.getByRole("menu");
        expect(visibleMenuList).toBeVisible();
      });

    // Click the burger icon again to close the menu
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    userEvent.click(closeButton);

    // Assert that the menu is closed
    await waitFor(() => {
        const closedMenuList = screen.queryByRole("menu");
        expect(closedMenuList).not.toBeInTheDocument(); 
      });
  });

  it("should remove the token in cookies and navigate to the login page when the Sign Out button is clicked", async () => {
    // 1. Mock the cookie to simulate a logged-in user
    Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

    // 2. Render the NavBar component
    render(
    <NavBar />);

    // 3. Log the token from Cookies.get to confirm the mock is applied
    console.log("Token from Cookies.get mock:", Cookies.get("token"));

    // 4. Find and click the Sign Out button
    const signOutButton = screen.getByText(/Sign Out/i);
    expect(signOutButton).toBeInTheDocument();

    // fireEvent.click(signOutButton);
    userEvent.click(signOutButton);

    // Assert 
    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith("token");
      expect(mockRouterPush).toHaveBeenCalledWith("/login");
    });
  });
});
