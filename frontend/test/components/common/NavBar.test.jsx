import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import NavBar from "../../../components/NavBar.jsx";
import { fetchUserData } from "../../../services/user.service.jsx";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("../../../services/user.service.jsx", () => ({
  fetchUserData: jest.fn().mockResolvedValue({ avatar: null }),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("../../../services/user.service.jsx", () => ({
  fetchUserData: jest.fn(),
}));

describe("NavBar Component", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      const msg = String(message);
      if (msg.includes("Not implemented: navigation")) {
        // Suppress this specific error
        return;
      }
      // Otherwise, log the error
      originalConsoleError(message);
    });
    jest.clearAllMocks();
    fetchUserData.mockResolvedValue({ avatar: null });
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should render a Sign in link when the user is not logged in", async () => {
    render(<NavBar />);

    const loginLink = await screen.findByText(/Sign in/i);

    expect(loginLink).toBeInTheDocument();
  });

  it("should render an avatar button  when the user is logged in", async () => {
    Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

    render(<NavBar />);

    const avatar = await screen.findByRole("button", { name: /avatar/i });

    expect(avatar).toBeInTheDocument();
  });

  it("should toggle the menu when the burger icon is clicked", async () => {
    // Render the NavBar component
    render(<NavBar />);

    // Find the burger menu icon once the user data has loaded
    const burgerIcon = await screen.findByRole("button", { name: /burger menu/i });

    // Initially, the menu should not be visible
    const menuList = screen.queryByRole("menu");
    expect(menuList).not.toBeInTheDocument(); // No menu initially

    // Click the burger menu icon
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
    render(<NavBar />);

    // 3. Log the token from Cookies.get to confirm the mock is applied
    console.log("Token from Cookies.get mock:", Cookies.get("token"));

    // 4. Find and click the Avatar button
    const avatar = await screen.findByRole("button", { name: /avatar/i });
    userEvent.click(avatar);

    // 5. Find and click the Sign Out button
    await waitFor(() => {
      const signOutButton = screen.getByText(/Sign Out/i);
      expect(signOutButton).toBeInTheDocument();
      userEvent.click(signOutButton);
    });

    // Assert
    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith("token");
      expect(mockRouterPush).toHaveBeenCalledWith("/login");
    });
  });
});
