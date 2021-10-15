import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/userRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send('hello world!')
});

app.use("/users", userRouter);

export { app };
