import { render, screen } from "@testing-library/react";
import CafeReviewCard from "../../../components/cafe/CafeReviewCard.jsx";

jest.mock("date-fns", () => ({
  formatDistanceToNowStrict: jest.fn(() => "a few seconds"),
}));

describe("CafeReviewCard Component", () => {
  const mockReviewData = {
    name: "Test",
    description: "Great cafe!",
    timestamp: new Date(),
    image: null,
  };

  it("renders the correct name and description", () => {
    render(<CafeReviewCard {...mockReviewData} />);

    const name = screen.getByText(mockReviewData.name);
    const description = screen.getByText(mockReviewData.description);

    // Assert that the name and description are rendered
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("renders the reviewer's uploaded avatar", () => {
    render(<CafeReviewCard {...mockReviewData} avatar="/uploads/avatars/test.jpg" />);

    expect(screen.getByAltText("Test's avatar")).toHaveAttribute(
      "src",
      expect.stringContaining("/uploads/avatars/test.jpg")
    );
  });

  it("falls back to the default avatar when the reviewer has none", () => {
    render(<CafeReviewCard {...mockReviewData} />);

    expect(screen.getByAltText("Test's avatar")).toHaveAttribute(
      "src",
      expect.stringContaining("/public/images/swish-logo.png")
    );
  });

  it("renders the correct timestamp", () => {
    render(<CafeReviewCard {...mockReviewData} />);

    const timestamp = screen.getByText("a few seconds ago");

    // Assert that the timestamp is rendered
    expect(timestamp).toBeInTheDocument();
  });

  it("renders the correct image", () => {
    render(<CafeReviewCard {...mockReviewData} />);

    const image = screen.queryByAltText("Cafe review image");

    // Assert that the image is not rendered
    expect(image).not.toBeInTheDocument();
  });

  it("render the image when it is provided", () => {
    const mockReviewDataWithImage = {
        name: "Test",
        description: "Great cafe!",
        timestamp: new Date(),
        image: "mock-image.jpg",
    };

    render(<CafeReviewCard {...mockReviewDataWithImage} />);

    const image = screen.getByAltText("review photo");

    // Assert that the image is rendered
    expect(image).toBeInTheDocument();
  });
});
