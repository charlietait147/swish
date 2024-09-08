import { render, screen} from "@testing-library/react";
import CafeList from "../../../components/cafe/CafeList.jsx";
import { mockCafeData } from "../../data/testCafeData.js";

describe("CafeList Component", () => {
    it("should render cafes when they are passed in as props", () => {

        render(<CafeList cafes={mockCafeData} />);

        expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
        expect()
    });

    it("should render the cafes in alphabetical order", () => {
        render(<CafeList cafes={mockCafeData} />);

        const cafeNames = screen.getAllByRole("heading", { level: 2});
        expect(cafeNames[0]).toHaveTextContent("Cafe 1");
        expect(cafeNames[1]).toHaveTextContent("Cafe 2");
    });

    it("should render a message when there are no cafes to display", () => {
        render(<CafeList cafes={[]} />);

        expect(screen.getByText(/Sorry!/i)).toBeInTheDocument();
        expect(screen.getByText(/We couldn't find any cafes that matched your search./i)).toBeInTheDocument();
    });
});