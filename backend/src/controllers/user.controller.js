import { registerUserService, loginUserService, forgotPasswordService, updatePasswordService, addCafeService, getCafesService, isCafeSavedService, getUserDataService, deleteSavedCafeService } from "../services/user.services.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";


export const registerUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(error => error.msg));
    }
    try {
        const { email, password } = req.body;
        const user = await registerUserService(email, password);
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '24h' });
        res.status(201).json({ message: "User registered successfully", user, token });
    } catch (error) {
        res.status(400).send(error.message);
        console.error("Registration failed", error);
        }
}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '24h' });
        res.status(201).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(400).send(error.message);
        console.error("Login failed", error);
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await forgotPasswordService(email)
        res.status(200).json(user);

    } catch (error) {
        // res.status(400).send("Password reset failed");
        res.status(400).json({ error: error.message });
        console.error("Password reset failed", error);
    }
}

export const updatePasswordController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(error => error.msg));
    }
    try {
        const userId = req.user._id
        const user = await updatePasswordService(req.body.newPassword, userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send("Password update failed");
        console.error("Password update failed", error);
    }
}



export const addCafeController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cafeId } = req.params;

        const updatedUser = await addCafeService(userId, cafeId);

        res.status(200).json({ message: "Cafe added to user successfully", user: updatedUser });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getCafesController = async (req, res) => {
    try {
        const userId = req.user._id;
        const cafes = await getCafesService(userId);

        res.status(200).json(cafes);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const isCafeSavedController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cafeId } = req.params;
        const saved = await isCafeSavedService(userId, cafeId);
        res.status(200).json({ isSaved: saved });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserDataController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await getUserDataService(userId);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteSavedCafeController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cafeId } = req.params;
        await deleteSavedCafeService(userId, cafeId);
        res.status(200).json({message: "Cafe deleted successfully"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
        

