import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const registerUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        return await newUser.save();
    } catch (error) {
        throw new Error(error);
    }
}

export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
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


