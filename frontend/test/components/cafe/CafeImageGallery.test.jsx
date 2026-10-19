import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeImageGallery from "../../../components/cafe/CafeImageGallery.jsx";

describe("CafeImageGallery Component", () => {
  it("should show every image except the first one", () => {
    const cafe = { name: "Cafe 1", images: ["a.jpg", "b.jpg", "c.jpg", "d.jpg"] };

    render(<CafeImageGallery cafe={cafe} />);

    expect(screen.getByText("Image Gallery")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(screen.queryByAltText("Cafe 1 photo 1")).not.toBeInTheDocument();
    expect(screen.getByAltText("Cafe 1 photo 2")).toBeInTheDocument();
  });

  it("should render nothing when the cafe only has one image", () => {
    const cafe = { name: "Cafe 1", images: ["a.jpg"] };

    const { container } = render(<CafeImageGallery cafe={cafe} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should not show the Show all photos button with fewer than 4 gallery photos", () => {
    const cafe = { name: "Cafe 1", images: ["a.jpg", "b.jpg", "c.jpg", "d.jpg"] };

    render(<CafeImageGallery cafe={cafe} />);

    expect(screen.queryByRole("button", { name: /Show all photos/i })).not.toBeInTheDocument();
  });

  it("should open a slideshow starting at the hero image and close it again", async () => {
    const cafe = { name: "Cafe 1", images: ["a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg"] };

    render(<CafeImageGallery cafe={cafe} />);

    await userEvent.click(screen.getByRole("button", { name: /Show all photos/i }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("1 / 5")).toBeInTheDocument();
    expect(within(dialog).getByAltText("Cafe 1 photo 1")).toBeInTheDocument();
    expect(within(dialog).queryByRole("button", { name: /Previous photo/i })).not.toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole("button", { name: /Next photo/i }));
    expect(within(dialog).getByText("2 / 5")).toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole("button", { name: /Close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
