import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordReset from "../../app/reset-password/[token]/page.jsx";
import { resetPassword } from "../../services/auth.service.jsx";

jest.mock("../../services/auth.service.jsx", () => ({
  resetPassword: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockRouterPush }),
  useParams: () => ({ token: "abc123" }),
}));

const submitPassword = (password) => {
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: password } });
  fireEvent.click(screen.getByRole("button", { name: "Save and Login" }));
};

describe("Reset password page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should reset the password with the token from the URL and redirect home", async () => {
    jest.useFakeTimers();
    resetPassword.mockResolvedValue({ message: "Password has been reset successfully", token: "jwt" });
    render(<PasswordReset />);

    submitPassword("newPassword123");

    expect(await screen.findByText("Logging in ...")).toBeInTheDocument();
    expect(resetPassword).toHaveBeenCalledWith("abc123", "newPassword123");

    jest.advanceTimersByTime(2000);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
    jest.useRealTimers();
  });

  it("should show the error message from the API when the reset fails", async () => {
    resetPassword.mockRejectedValue(new Error("Token is invalid or has expired"));
    render(<PasswordReset />);

    submitPassword("newPassword123");

    expect(await screen.findByRole("alert")).toHaveTextContent("Token is invalid or has expired");
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
