import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendResetEmail } from "../../utils/email.js";

export const registerUserService = async (email, password) => {
    try {
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
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('A user with this email does not exist');
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
            throw new Error('Invalid password');
        }
        return user;
    }
    catch (error) {
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

        const resetUrl = `https://localhost:3000/reset-password/${rawToken}`;

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




