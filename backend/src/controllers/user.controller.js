import { registerUserService, loginUserService, updatePasswordService } from "../services/user.services.js";
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
        res.status(201).json({ message: "User registered successfully", user, token});
    } catch (error) {
        res.status(400).send("Registration failed");
        console.error("Registration failed", error);
    }
}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '24h' });
        res.status(201).json({ message: "User logged in successfully", user, token});
    } catch (error) {
        res.status(400).send("Login failed");
        console.error("Login failed", error);
    }
}

export const updatePasswordController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(error => error.msg));
    }
    try {
        const user = await updatePasswordService(req.body.newPassword, req.params._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send("Password update failed");
        console.error("Password update failed", error);
    }
}

