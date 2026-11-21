import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import GoogleSignInButton from "../../../components/authentication/GoogleSignInButton.jsx";
import { googleLogin } from "../../../services/auth.service.jsx";

jest.mock("../../../services/auth.service.jsx", () => ({
  googleLogin: jest.fn(),
}));

// Run the script's onReady straight away instead of loading Google's SDK
jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ onReady }) => {
    const { useEffect } = jest.requireActual("react");
    useEffect(() => {
      onReady();
    }, []);
    return null;
  },
}));

const loadButton = (clientId) => {
  if (clientId) {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = clientId;
  }
  return { GoogleSignInButton, googleLogin };
};

describe("GoogleSignInButton Component", () => {
  let initCodeClient;
  let requestCode;

  beforeEach(() => {
    requestCode = jest.fn();
    initCodeClient = jest.fn(() => ({ requestCode }));
    window.google = { accounts: { oauth2: { initCodeClient } } };
  });

  afterEach(() => {
    delete window.google;
    delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    jest.clearAllMocks();
  });

  it("renders nothing when no Google client ID is configured", () => {
    const { GoogleSignInButton } = loadButton();
    const { container } = render(
      <GoogleSignInButton onSuccess={jest.fn()} onError={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
    expect(initCodeClient).not.toHaveBeenCalled();
  });

  it("renders its own button with the matching label", () => {
    const { GoogleSignInButton } = loadButton("test-client-id");
    render(<GoogleSignInButton text="signup_with" onSuccess={jest.fn()} onError={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Sign up with Google" })).toBeInTheDocument();
    expect(initCodeClient).toHaveBeenCalledWith(
      expect.objectContaining({ client_id: "test-client-id", ux_mode: "popup" })
    );
  });

  it("opens the Google popup when clicked", async () => {
    const { GoogleSignInButton } = loadButton("test-client-id");
    render(<GoogleSignInButton onSuccess={jest.fn()} onError={jest.fn()} />);

    const button = screen.getByRole("button", { name: "Sign in with Google" });
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);

    expect(requestCode).toHaveBeenCalled();
  });

  it("calls onSuccess with the response when Google returns a code", async () => {
    const { GoogleSignInButton, googleLogin } = loadButton("test-client-id");
    const onSuccess = jest.fn();
    googleLogin.mockResolvedValue({ token: "jwt" });

    render(<GoogleSignInButton onSuccess={onSuccess} onError={jest.fn()} />);
    await act(() => initCodeClient.mock.calls[0][0].callback({ code: "google-code" }));

    expect(googleLogin).toHaveBeenCalledWith("google-code");
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ token: "jwt" }));
  });

  it("calls onError with the message when Google sign in fails", async () => {
    const { GoogleSignInButton, googleLogin } = loadButton("test-client-id");
    const onError = jest.fn();
    googleLogin.mockRejectedValue(new Error("Invalid Google credential"));

    render(<GoogleSignInButton onSuccess={jest.fn()} onError={onError} />);
    await act(() => initCodeClient.mock.calls[0][0].callback({ code: "bad" }));

    await waitFor(() => expect(onError).toHaveBeenCalledWith("Invalid Google credential"));
  });

  it("calls onError without contacting the backend when the user denies access", async () => {
    const { GoogleSignInButton, googleLogin } = loadButton("test-client-id");
    const onError = jest.fn();

    render(<GoogleSignInButton onSuccess={jest.fn()} onError={onError} />);
    await act(() => initCodeClient.mock.calls[0][0].callback({ error: "access_denied" }));

    expect(googleLogin).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith("Google sign in was cancelled");
  });
});
