import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "../../../components/cafe/StarRating.jsx";

describe("StarRating Component", () => {
  it("shows the rating as filled orange stars when read-only", () => {
    const { container } = render(<StarRating rating={3} />);

    expect(screen.getByRole("img", { name: "3 out of 5 stars" })).toBeInTheDocument();
    expect(container.querySelectorAll("svg.text-orange-500")).toHaveLength(3);
    expect(container.querySelectorAll("svg.text-gray-300")).toHaveLength(2);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("calls onChange with the clicked star when interactive", async () => {
    const onChange = jest.fn();
    render(<StarRating rating={0} onChange={onChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "5 stars" }));

    expect(onChange).toHaveBeenCalledWith(5);
  });
});
