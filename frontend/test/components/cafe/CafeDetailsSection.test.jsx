import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeDetailsSection from "../../../components/cafe/CafeDetailsSection.jsx";
import Cookies from "js-cookie";
import { addCafe, isCafeSaved } from "../../../services/user.service";

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
}));

jest.mock("../../../services/user.service", () => ({
  addCafe: jest.fn(),
  isCafeSaved: jest.fn(),
}));

describe("CafeDetailsSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the save cafe modal when the save button is clicked", async () => {
    Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");
    isCafeSaved.mockResolvedValue(false);
    addCafe.mockResolvedValue(true);

    render(<CafeDetailsSection cafe={{ _id: 1, name: "Cafe 1" }} />);

    const saveButton = screen.getByRole("button", { name: /Save/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(addCafe).toHaveBeenCalledTimes(1);
      expect(addCafe).toHaveBeenCalledWith(1);
      expect(screen.getByText(/Saved Cafe 1 to account/i)).toBeInTheDocument();
    });
  });

  it("should redirect to the home page when the cafe is already saved", async () => {
    Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");
    isCafeSaved.mockResolvedValue(true);

    render(<CafeDetailsSection cafe={{ _id: 1, name: "Cafe 1" }} />);
    await waitFor(() => {
      const saveButton = screen.getByRole("button", { name: /Saved/i });
      userEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/account");
    });
  });
});
