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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const updatePasswordService = async (newPassword, _id) => {
    try {
        console.log(_id);
        const user = await User.findById(_id);
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
