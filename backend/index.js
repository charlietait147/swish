import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./src/db/db.connection.js";
import authenticate from "./src/middleware/authenticate.js";
import path from "path";
import { fileURLToPath } from 'url';

import { registerUserRouter } from "./src/routes/userRoutes/registerUser.route.js";
import { loginUserRouter } from "./src/routes/userRoutes/loginUser.route.js";
import { updatePasswordRouter } from "./src/routes/userRoutes/updatePassword.route.js";
import { addCafeRouter } from "./src/routes/userRoutes/addCafe.route.js";
import { getCafesRouter } from "./src/routes/userRoutes/getCafes.route.js";

import { addReviewRouter } from "./src/routes/reviewRoutes/addReview.route.js";
import { editReviewRouter } from "./src/routes/reviewRoutes/editReview.route.js";
import { deleteReviewRouter } from "./src/routes/reviewRoutes/deleteReview.route.js";

import { getAllCafesRouter } from "./src/routes/cafeRoutes/getAllCafes.route.js";
import { getSingleCafeRouter } from "./src/routes/cafeRoutes/getSingleCafe.route.js";


const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/public', express.static('./images'));

connectDb();

app.use("/user", registerUserRouter);
app.use("/user", loginUserRouter);
app.use("/user", authenticate, updatePasswordRouter);
app.use("/user", authenticate, addCafeRouter);
app.use("/user", authenticate, getCafesRouter);

app.use("/review", authenticate, addReviewRouter);
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

export default app;
