import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { avatarsDir } from '../middleware/avatar.upload.js';
import { sendResetEmail } from "../../utils/email.js";

const normaliseEmail = (email) => String(email ?? "").trim().toLowerCase();

// Hashes and stores a new password, and records when it changed so older JWTs stop working.
// Rounded down to the second because JWT `iat` is in whole seconds.
const setPassword = async (user, newPassword) => {
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordChangedAt = new Date(Math.floor(Date.now() / 1000) * 1000);
};

export const registerUserService = async (email, password) => {
    try {
        email = normaliseEmail(email);
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('A user with this email already exists');
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
        const user = await User.findOne({ email: normaliseEmail(email) });
        // Same message for unknown email and wrong password, so login can't be used to discover accounts
        if (!user) {
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

export const forgotPasswordService = async (email) => {
    try {
        const user = await User.findOne({ email: normaliseEmail(email) });
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

        await setPassword(user, newPassword);
        await user.save();

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
            throw new Error('Token is invalid or has expired');
          }
        
          await setPassword(user, newPassword);

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




