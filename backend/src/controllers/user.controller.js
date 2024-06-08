import { registerUserService, loginUserService, updatePasswordService } from "../services/user.services";
import { validationResult } from "express-validator";

export const registerUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(error => error.msg));
    }
    try {
        const { email, password } = req.body;
        const user = await registerUserService(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send("Registration failed");
        console.error("Registration failed", error);
    }
}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        res.status(200).json(user);
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
        const user = await updatePasswordService(req.body.newPassword, req.params_id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send("Password update failed");
        console.error("Password update failed", error);
    }
}

