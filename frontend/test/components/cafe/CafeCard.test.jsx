import { render, screen } from "@testing-library/react";
import CafeCard from "../../../components/cafe/CafeCard.jsx";

describe("CafeCard Component", () => {
  it("renders the correct href with cafeId", () => {
    const mockCafeId = "12345";

    render(<CafeCard cafeId={mockCafeId} />);

    const cafeLink = screen.getByTestId("cafe-link");

    // Assert that the anchor tag's href contains the correct cafeId
    expect(cafeLink).toHaveAttribute("href", `cafe/${mockCafeId}`);
  });

  it("renders the correct name and location", () => {
    const mockName = "Cafe 1";
    const mockLocation = "Cafe Location";

    render(<CafeCard name={mockName} location={mockLocation} />);

    const name = screen.getByText(mockName);
    const location = screen.getByText(mockLocation);

    // Assert that the name and location are rendered
    expect(name).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  it("renders the correct background image", () => {
    const mockImage = "cafe1.jpg";

    process.env.NEXT_API_URL = "https://example.com";

    render(<CafeCard image={mockImage} />);

    const cafeCard = screen.getByTestId("cafe-card");

    // Assert that the background image is set correctly
    expect(cafeCard).toHaveStyle(
      `background-image: url(https://example.com/public/images/${mockImage})`
    );
  });
});
