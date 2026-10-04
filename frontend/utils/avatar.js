const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";

export const DEFAULT_AVATAR = "swish-logo.png";

// Uploaded avatars are stored as "/uploads/avatars/<file>", the default lives in /public/images
export const getAvatarSrc = (avatar) => {
  if (avatar && avatar.startsWith("/uploads/")) {
    return `${API_URL}${avatar}`;
  }
  return `${API_URL}/public/images/${avatar || DEFAULT_AVATAR}`;
};
