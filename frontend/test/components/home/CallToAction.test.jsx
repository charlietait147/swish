import { render, screen } from "@testing-library/react";
import Cookies from "js-cookie";
import CallToAction from "../../../components/CallToAction.jsx";

jest.mock("js-cookie", () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  }));

describe("CallToAction Component", () => {
    it("should render a Register button when the user is not logged in", () => {
        render(<CallToAction />);

        const registerButton = screen.getByRole("button", { name: /Register/i });

        expect(registerButton).toBeInTheDocument();
    });

    it("should render an Account button when the user is logged in", () => {
        Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

        render(<CallToAction />);

        const accountButton = screen.getByRole("button", { name: /My Account/i });

        expect(accountButton).toBeInTheDocument();
    });
});



