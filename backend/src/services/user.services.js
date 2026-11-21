import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { avatarsDir } from '../middleware/avatar.upload.js';
import { sendResetEmail } from "../../utils/email.js";
import { exchangeGoogleAuthCode } from "../../utils/google.js";

export const registerUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('Unable to create an account with these details');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatarUrl = "swish-logo.png";
    
        const newUser = new User({ email, password: hashedPassword, avatar: avatarUrl });
        return await newUser.save();

    } catch (error) {
        throw new Error(error.message);
    }
}

export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        // Google-only accounts have no password to check against
        if (!user || !user.password) {
            throw new Error('Invalid email or password');
        }

        let isPasswordValid = false;

        if (process.env.NODE_ENV === 'development') {
            // If in a test environment, use compareSync without hashing
            isPasswordValid = bcrypt.compareSync(password, user.password);
        } else {
            // In production, use bcrypt.compare
            isPasswordValid = await bcrypt.compare(password, user.password);
        }
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const googleAuthService = async (code) => {
    try {
        const { sub: googleId, email, email_verified, name } = await exchangeGoogleAuthCode(code);
        if (!email || !email_verified) {
            throw new Error('Your Google account email is not verified');
        }

        const existingGoogleUser = await User.findOne({ googleId });
        if (existingGoogleUser) {
            return existingGoogleUser;
        }

        // Link Google to an existing email/password account with the same verified email
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            existingEmailUser.googleId = googleId;
            if (!existingEmailUser.name && name) {
                existingEmailUser.name = name;
            }
            return await existingEmailUser.save();
        }

        const newUser = new User({ email, googleId, name, avatar: "swish-logo.png" });
        return await newUser.save();

    } catch (error) {
        throw new Error(error.message);
    }
}

export const forgotPasswordService = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('A user with this email does not exist');
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        user.resetPasswordToken = hashedToken;

        const expiryMinutes = parseInt(process.env.RESET_TOKEN_EXPIRY_MINUTES, 10) || 60;
        user.resetPasswordExpires = Date.now() + expiryMinutes * 60 * 1000; 
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

        await sendResetEmail(user.email, resetUrl);

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

export const updatePasswordService = async (newPassword, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // hash the new password
        user.password = hashedPassword; // set the user's password to the hashed password
        await user.save(); // save the user

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const resetPasswordService = async(token, newPassword) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // token still valid
          });

          if (!user) {
            throw new Error('This password reset link has expired. Please request a new one.');
          }
        
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;

          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          await user.save();

          return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

export const addCafeService = async (userId, cafeId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found');
        }

        if (user.cafes.includes(cafeId)) {
            throw new Error('Cafe already added');
        }

        user.cafes.push(cafeId);
        await user.save();

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCafesService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const cafes = await User.findById(userId).populate('cafes');
        return cafes;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const isCafeSavedService = async (userId, cafeId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.cafes.includes(cafeId);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserDataService = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate({
                path: 'reviews',
                populate: { path: 'cafe' }
            })
            .populate('cafes');

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteSavedCafeService = async (userId, cafeId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const cafeIndex = user.cafes.indexOf(cafeId);

        if (cafeIndex === -1) {
            throw new Error('Cafe not found');
        }
        user.cafes.splice(cafeIndex, 1);

        await user.save();

        return user;

    } catch (error) {
        throw new Error(error.message);
    }

}

export const updateAvatarService = async (userId, avatarUrl) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const oldAvatar = user.avatar;

        user.avatar = avatarUrl;

        await user.save();

        // Only remove previously uploaded avatars, never the default image
        if (oldAvatar && oldAvatar.startsWith("/uploads/avatars/")) {
            const oldPath = path.join(avatarsDir, path.basename(oldAvatar));

            fs.unlink(oldPath, (err) => {
                if (err) console.error("Failed to delete old avatar:", err);
            });
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};




