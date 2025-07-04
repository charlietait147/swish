import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./src/db/db.connection.js";
import authenticate from "./src/middleware/authenticate.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import upload from './src/middleware/file.storage.js';

import { registerUserRouter } from "./src/routes/userRoutes/registerUser.route.js";
import { loginUserRouter } from "./src/routes/userRoutes/loginUser.route.js";
import { updatePasswordRouter } from "./src/routes/userRoutes/updatePassword.route.js";
import { addCafeRouter } from "./src/routes/userRoutes/addCafe.route.js";
import { getCafesRouter } from "./src/routes/userRoutes/getCafes.route.js";
import { isCafeSavedRouter } from "./src/routes/userRoutes/isCafeSaved.route.js";
import { getUserDataRouter } from "./src/routes/userRoutes/getUserData.route.js";
import { deleteSavedCafeRouter } from "./src/routes/userRoutes/deleteSavedCafe.route.js";

import { addReviewRouter } from "./src/routes/reviewRoutes/addReview.route.js";
import { editReviewRouter } from "./src/routes/reviewRoutes/editReview.route.js";
import { deleteReviewRouter } from "./src/routes/reviewRoutes/deleteReview.route.js";

import { getAllCafesRouter } from "./src/routes/cafeRoutes/getAllCafes.route.js";
import { getSingleCafeRouter } from "./src/routes/cafeRoutes/getSingleCafe.route.js";
import { forgotPasswordRouter } from "./src/routes/userRoutes/forgotPassword.route.js";



const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/public', express.static('./images'));

connectDb();

app.use("/user", registerUserRouter);
app.use("/user", loginUserRouter);
app.use('/user', forgotPasswordRouter);
app.use("/user", authenticate, updatePasswordRouter);
app.use("/user", authenticate, addCafeRouter);
app.use("/user", authenticate, getCafesRouter);
app.use("/user", authenticate, isCafeSavedRouter);
app.use("/user", authenticate, getUserDataRouter);
app.use("/user", authenticate, deleteSavedCafeRouter )

app.use("/review", authenticate, upload.single('image'), addReviewRouter);
app.use("/review", authenticate, editReviewRouter);
app.use("/review", authenticate, deleteReviewRouter);

app.use("/cafes", getAllCafesRouter);
app.use("/cafes", getSingleCafeRouter);



const { PORT, HOST } = process.env;

// const server = app.listen(PORT,() => {
//     console.log(`Server is listening at http://${HOST}:${PORT}`);
// });

// export default server;

if (process.env.NODE_ENV !== 'development') {
     app.listen(PORT, () => {
        console.log(`Server is listening at http://${HOST}:${PORT}`);
    });
}

if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, HOST, () => {
        console.log(`Server is listening at http://${HOST}:${PORT}`);
    });
}

export default app;
