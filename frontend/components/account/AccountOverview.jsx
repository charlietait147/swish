import { useRef, useState } from "react";
import Image from "next/image";
import { uploadAvatar } from "../../services/user.service.jsx";
import { updatePassword } from "../../services/auth.service.jsx";
import { getAvatarSrc } from "../../utils/avatar";

const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB, matches the backend limit
const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // matches the backend validation

function AccountOverview({ email, avatar, onAvatarUpdated, cafesLength, reviewsLength }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setPasswordUpdated(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordUpdated(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (!PASSWORD_RULE.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters long and must contain at least one letter and one number");
      return;
    }

    setPasswordError(null);
    setSavingPassword(true);
    try {
      await updatePassword(newPassword);
      setPasswordUpdated(true);
      setShowPasswordForm(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // allow picking the same file again
    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      setAvatarError("Please choose a JPEG, PNG or WEBP image");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError("Avatar must be 2MB or smaller");
      return;
    }

    setAvatarError(null);
    setUploading(true);
    try {
      const data = await uploadAvatar(file);
      onAvatarUpdated?.(data.avatar);
    } catch (error) {
      setAvatarError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-200 pt-16 pb-3">
        <div className="max-width mx-auto px-4">
          <h1 className="font-semibold text-2xl text-gray-800 text-center md:text-3xl">
            My Account
          </h1>
        </div>
      </div>
        <div className="bg-white py-3 shadow-lg max-w-screen-lg mx-auto md:pb-6 md:pt-4">
          <div className="flex flex-row items-center px-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-xl border border-gray-300">
              <Image src={getAvatarSrc(avatar)} width={64} height={64} alt="Account Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="ml-2">
              <h1 className="font-light text-gray-700 text-sm">{email}</h1>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-xs font-semibold text-gray-600 underline cursor-pointer disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Change avatar"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
                data-testid="avatar-input"
              />
              {avatarError && (
                <p className="text-xs text-red-600" role="alert">{avatarError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center px-4">
            <button
              type="button"
              onClick={togglePasswordForm}
              aria-expanded={showPasswordForm}
              className="border border-gray-200 rounded-md py-2 px-4 bg-gray-100 text-sm font-semibold cursor-pointer"
            >
              {showPasswordForm ? "Cancel" : "Update password"}
            </button>
            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="mt-4 w-full max-w-sm space-y-3">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
                    New password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && (
                  <p className="text-xs text-red-600" role="alert">{passwordError}</p>
                )}
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 disabled:opacity-50"
                >
                  {savingPassword ? "Saving..." : "Save new password"}
                </button>
              </form>
            )}
            {passwordUpdated && (
              <p className="mt-2 text-xs text-green-700" role="status">Password updated</p>
            )}
          </div>
          <div className="border border-1 border-gray-200 mt-4"></div>
          <div className="flex flex-row justify-around p-4">
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-sm">My Reviews</h3>
              <h3 className="font-semibold text-xl text-gray-500">
                {reviewsLength}
              </h3>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-sm ">My Saved Cafe's</h3>
              <h3 className="font-semibold text-xl text-gray-500">
                {cafesLength}
              </h3>
            </div>
          </div>
        </div>
    </div>
  );
}

export default AccountOverview;
