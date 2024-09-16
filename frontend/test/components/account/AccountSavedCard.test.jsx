import { render, screen, waitFor } from "@testing-library/react";
import AccountSavedCafeCard from "../../../components/account/AccountSavedCafeCard.jsx";
import userEvent from "@testing-library/user-event";
import { deleteSavedCafe } from "../../../services/user.service.jsx";

jest.mock("../../../services/user.service", () => ({
  deleteSavedCafe: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("AccountSavedCafeCard Component", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe("Props tests", () => {
    it("should render the correct cafe props", () => {
      const cafeId = "1";
      const cafeImage = "cafe.jpg";
      const cafeName = "Cafe 1";
      const cafeLocation = "London";
      const setCafesUpdated = jest.fn();

      render(
        <AccountSavedCafeCard
          cafeImage={cafeImage}
          cafeName={cafeName}
          cafeLocation={cafeLocation}
          cafeId={cafeId}
          setCafesUpdated={setCafesUpdated}
        />
      );

      expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
      expect(screen.getByText(/London/i)).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Cafe 1/i })).toBeInTheDocument();
    });
  });
  describe("Functionality tests", () => {
    it("should navigate to the cafe page when the card is clicked", async () => {
      const cafeId = "1";
      const setCafesUpdated = jest.fn();
      const cafeLocation = "London";
      const cafeName = "Cafe 1";
      const cafeImage = "cafe.jpg";

      render(
        <AccountSavedCafeCard
          cafeId={cafeId}
          setCafesUpdated={setCafesUpdated}
          cafeLocation={cafeLocation}
          cafeImage={cafeImage}
          cafeName={cafeName}
        />
      );

      userEvent.click(
        screen.getByRole("button", { name: /cafe-click-handler/i })
      );

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith("/cafe/1");
      });
    });
    it("should call deleteSavedCafe when the delete button is clicked", async () => {
      const cafeId = "1";
      const setCafesUpdated = jest.fn();
      const cafeLocation = "London";
      const cafeName = "Cafe 1";
      const cafeImage = "cafe.jpg";

      render(
        <AccountSavedCafeCard
          cafeId={cafeId}
          setCafesUpdated={setCafesUpdated}
          cafeLocation={cafeLocation}
          cafeImage={cafeImage}
          cafeName={cafeName}
        />
      );

      deleteSavedCafe.mockResolvedValueOnce({ success: true });

      await userEvent.click(screen.getByRole("button", { name: /delete-cafe/i }));

      await waitFor(() => {
        expect(deleteSavedCafe).toHaveBeenCalledWith("1");
      });
    });
  });
});
