import { render, screen } from "@testing-library/react";
import AccountOverview from "../../../components/account/AccountOverview.jsx";

describe("AccountOverview Component", () => {
  const email = "test@gmail.com";
  const cafesLength = 2;
  const reviewsLength = 3;

  it("should render the account overview with props", () => {
    render(
      <AccountOverview
        email={email}
        cafesLength={cafesLength}
        reviewsLength={reviewsLength}
      />
    );

    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText(cafesLength)).toBeInTheDocument();
    expect(screen.getByText(reviewsLength)).toBeInTheDocument();
  });
});
