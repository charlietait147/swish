import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./src/db/db.connection.js";
import authenticate from "./src/middleware/authenticate.js";

import { registerUserRouter } from "./src/routes/userRoutes/registerUser.route.js";
import { loginUserRouter } from "./src/routes/userRoutes/loginUser.route.js";
import { updatePasswordRouter } from "./src/routes/userRoutes/updatePassword.route.js";

const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

app.use(cors());
app.use(express.json());

connectDb();

app.use("/user", registerUserRouter);
app.use("/user", loginUserRouter);
app.use("/user", authenticate, updatePasswordRouter);

const { PORT, HOST } = process.env;

const server = app.listen(PORT,() => {
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});

export default server;
