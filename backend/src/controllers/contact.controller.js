import { validationResult } from "express-validator";
import { sendContactEmail } from "../../utils/email.js";

export const sendContactMessageController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(error => error.msg));
    }
    try {
        const { firstName, lastName, email, message } = req.body;
        await sendContactEmail({ firstName, lastName, email, message });
        res.status(200).json({ message: "Thanks for getting in touch! We'll get back to you soon." });
    } catch (error) {
        console.error("Sending contact message failed", error);
        res.status(500).send("Sorry, your message couldn't be sent. Please try again later.");
    }
}
