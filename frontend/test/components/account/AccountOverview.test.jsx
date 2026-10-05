import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountOverview from "../../../components/account/AccountOverview.jsx";
import { uploadAvatar } from "../../../services/user.service.jsx";
import { updatePassword } from "../../../services/auth.service.jsx";

jest.mock("../../../services/user.service.jsx", () => ({
  uploadAvatar: jest.fn(),
}));

jest.mock("../../../services/auth.service.jsx", () => ({
  updatePassword: jest.fn(),
}));

const fillPasswordForm = (newPassword, confirmPassword) => {
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  fireEvent.change(screen.getByLabelText("New password"), { target: { value: newPassword } });
  fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: confirmPassword } });
  fireEvent.click(screen.getByRole("button", { name: "Save new password" }));
};

describe("AccountOverview Component", () => {
  const email = "test@gmail.com";
  const cafesLength = 2;
  const reviewsLength = 3;

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("should upload the chosen image and pass the new avatar to onAvatarUpdated", async () => {
    uploadAvatar.mockResolvedValue({ message: "Avatar updated", avatar: "/uploads/avatars/new.png" });
    const onAvatarUpdated = jest.fn();
    const file = new File(["image"], "avatar.png", { type: "image/png" });

    render(<AccountOverview email={email} onAvatarUpdated={onAvatarUpdated} />);
    fireEvent.change(screen.getByTestId("avatar-input"), { target: { files: [file] } });

    await waitFor(() => {
      expect(uploadAvatar).toHaveBeenCalledWith(file);
      expect(onAvatarUpdated).toHaveBeenCalledWith("/uploads/avatars/new.png");
    });
  });

  it("should show an error and not upload when the file is not an image", async () => {
    const file = new File(["text"], "notes.txt", { type: "text/plain" });

    render(<AccountOverview email={email} />);
    fireEvent.change(screen.getByTestId("avatar-input"), { target: { files: [file] } });

    expect(await screen.findByRole("alert")).toHaveTextContent("Please choose a JPEG, PNG or WEBP image");
    expect(uploadAvatar).not.toHaveBeenCalled();
  });

  it("should show the error message when the upload fails", async () => {
    uploadAvatar.mockRejectedValue(new Error("Avatar must be 2MB or smaller"));
    const file = new File(["image"], "avatar.png", { type: "image/png" });

    render(<AccountOverview email={email} />);
    fireEvent.change(screen.getByTestId("avatar-input"), { target: { files: [file] } });

    expect(await screen.findByRole("alert")).toHaveTextContent("Avatar must be 2MB or smaller");
  });

  describe("Update password", () => {
    it("should open the form when Update password is clicked", () => {
      render(<AccountOverview email={email} />);

      expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Update password" }));
      expect(screen.getByLabelText("New password")).toBeInTheDocument();
      expect(screen.getByLabelText("Confirm new password")).toBeInTheDocument();
    });

    it("should update the password and confirm success", async () => {
      updatePassword.mockResolvedValue({ message: "Password updated successfully" });
      render(<AccountOverview email={email} />);

      fillPasswordForm("newPassword123", "newPassword123");

      expect(await screen.findByRole("status")).toHaveTextContent("Password updated");
      expect(updatePassword).toHaveBeenCalledWith("newPassword123");
      expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
    });

    it("should not submit when the passwords do not match", async () => {
      render(<AccountOverview email={email} />);

      fillPasswordForm("newPassword123", "newPassword124");

      expect(await screen.findByRole("alert")).toHaveTextContent("Passwords do not match");
      expect(updatePassword).not.toHaveBeenCalled();
    });

    it("should not submit a password that is too weak", async () => {
      render(<AccountOverview email={email} />);

      fillPasswordForm("short", "short");

      expect(await screen.findByRole("alert")).toHaveTextContent("Password must be at least 8 characters long");
      expect(updatePassword).not.toHaveBeenCalled();
    });

    it("should show the error message when the update fails", async () => {
      updatePassword.mockRejectedValue(new Error("Password update failed"));
      render(<AccountOverview email={email} />);

      fillPasswordForm("newPassword123", "newPassword123");

      expect(await screen.findByRole("alert")).toHaveTextContent("Password update failed");
    });
  });
});
