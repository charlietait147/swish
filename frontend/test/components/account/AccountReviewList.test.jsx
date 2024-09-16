import { render, screen, waitFor } from "@testing-library/react";
import AccountReviewList from "../../../components/account/AccountReviewList.jsx";

describe("AccountReviewList Component", () => {
  it("should display a message and a link when the user has no reviews", () => {
    render(<AccountReviewList reviews={[]} />);

    expect(screen.getByText(/Write your first review!/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /here/i })).toBeInTheDocument();
  });

  it("should display the reviews when the user has reviews", () => {
    const reviews = [
      {
        _id: "1",
        cafe: {
          _id: "1",
          name: "Cafe 1",
          location: "London",
          image: "cafe.jpg",
        },
        name: "Cafe 1",
        description: "Great cafe",
        timestamp: new Date(),
        image: "review.jpg",
      },
      {
        _id: "2",
        cafe: {
          _id: "2",
          name: "Cafe 2",
          location: "Paris",
          image: "cafe2.jpg",
        },
        name: "Cafe 2",
        description: "Lovely cafe",
        timestamp: new Date(),
        image: "review2.jpg",
      },
    ];

    render(<AccountReviewList reviews={reviews} />);

    expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Great cafe/i)).toBeInTheDocument();
    expect(screen.getByText(/Lovely cafe/i)).toBeInTheDocument();

    const images = screen.getAllByRole("img", { name: /review photo/i });
    expect(images).toHaveLength(2);
  });
});

