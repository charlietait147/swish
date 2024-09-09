import { render, screen } from "@testing-library/react";
import CafeCard from "../../../components/cafe/CafeCard.jsx";

describe("CafeCard Component", () => {
  const mockCafeData = {
    cafeId: "12345",
    name: "Cafe 1",
    location: "Cafe Location",
    image: "cafe1.jpg",
  };

  it("renders the correct href with cafeId", () => {
    render(<CafeCard {...mockCafeData} />);

    const cafeLink = screen.getByTestId("cafe-link");

    // Assert that the anchor tag's href contains the correct cafeId
    expect(cafeLink).toHaveAttribute("href", `cafe/${mockCafeData.cafeId}`);
  });

  it("renders the correct name and location", () => {
    render(<CafeCard {...mockCafeData} />);

    const name = screen.getByText(mockCafeData.name);
    const location = screen.getByText(mockCafeData.location);

    // Assert that the name and location are rendered
    expect(name).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  it("renders the correct background image", () => {
    process.env.NEXT_API_URL = "https://example.com";

    render(<CafeCard {...mockCafeData} />);

    const cafeCard = screen.getByTestId("cafe-card");

    // Assert that the background image is set correctly
    expect(cafeCard).toHaveStyle(
      `background-image: url(https://example.com/public/images/${mockCafeData.image})`
    );
  });
});
