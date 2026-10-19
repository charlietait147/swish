import { render, screen } from "@testing-library/react";
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
});
