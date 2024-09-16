import { render, screen } from "@testing-library/react";
import AccountSavedCafeList from "../../../components/account/AccountSavedCafeList.jsx";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("AccountSavedCafeList Component", () => {
    it("should display a message and a link when the user has no saved cafes", () => {
        const setCafesUpdated = jest.fn();

        render(<AccountSavedCafeList cafes={[]} setCafesUpdated={setCafesUpdated} />);

        expect(screen.getByText(/No cafes saved yet!/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /here/i })).toBeInTheDocument();
    })

    it("should display the saved cafes when the user has saved cafes", () => {
        const cafes = [
            {
                _id: "1",
                name: "Cafe 1",
                description: "A great cafe",
                website: "cafe@gmail.com",
                image: "cafe.jpg",
                location: "London",
            },
            {
                _id: "2",
                name: "Cafe 2",
                description: "Another great cafe",
                website: "cafe2@gmail.com",
                image: "cafe2.jpg",
                location: "Paris",
            },
        ]

        const setCafesUpdated = jest.fn();

        render(<AccountSavedCafeList cafes={cafes} setCafesUpdated={setCafesUpdated}/>);

        expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();

    });
});