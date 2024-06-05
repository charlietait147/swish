import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

app.use(cors());
app.use(express.json());

const { PORT, HOST } = process.env;

const server = app.listen(PORT,() => {
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});

export default server;
