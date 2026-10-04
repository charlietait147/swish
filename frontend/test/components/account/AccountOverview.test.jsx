import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountOverview from "../../../components/account/AccountOverview.jsx";
import { uploadAvatar } from "../../../services/user.service.jsx";

jest.mock("../../../services/user.service.jsx", () => ({
  uploadAvatar: jest.fn(),
}));

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
});
