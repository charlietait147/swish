import crypto from "crypto";
import jwt from "jsonwebtoken";

const GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ISSUERS = ["accounts.google.com", "https://accounts.google.com"];

// Google rotates its signing keys, so cache them for as long as its Cache-Control header allows
let cachedKeys = null;
let cachedKeysExpireAt = 0;

const getGoogleSigningKeys = async () => {
    if (cachedKeys && Date.now() < cachedKeysExpireAt) {
        return cachedKeys;
    }

    const res = await fetch(GOOGLE_CERTS_URL);
    if (!res.ok) {
        throw new Error("Unable to fetch Google signing keys");
    }

    const { keys } = await res.json();
    const maxAge = Number(res.headers.get("cache-control")?.match(/max-age=(\d+)/)?.[1]) || 3600;

    cachedKeys = keys;
    cachedKeysExpireAt = Date.now() + maxAge * 1000;
    return keys;
};

// Verifies a Google Identity Services ID token and returns its payload (email, name, sub, ...)
export const verifyGoogleIdToken = async (idToken) => {
    const decoded = jwt.decode(idToken, { complete: true });
    if (!decoded?.header?.kid) {
        throw new Error("Invalid Google credential");
    }

    const keys = await getGoogleSigningKeys();
    const jwk = keys.find((key) => key.kid === decoded.header.kid);
    if (!jwk) {
        throw new Error("Invalid Google credential");
    }

    const publicKey = crypto.createPublicKey({ key: jwk, format: "jwk" });

    try {
        return jwt.verify(idToken, publicKey, {
            algorithms: ["RS256"],
            audience: process.env.GOOGLE_CLIENT_ID,
            issuer: GOOGLE_ISSUERS,
        });
    } catch (error) {
        throw new Error("Invalid Google credential");
    }
};

// Swaps the one-time code from the frontend's Google popup for an ID token, then verifies it
export const exchangeGoogleAuthCode = async (code) => {
    const res = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            // Popup sign ins have no redirect page, so Google expects this placeholder
            redirect_uri: "postmessage",
            grant_type: "authorization_code",
        }),
    });
    if (!res.ok) {
        throw new Error("Invalid Google credential");
    }

    const { id_token } = await res.json();
    return verifyGoogleIdToken(id_token);
};
