import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/userRoutes";
import { tennisRouter } from "./routes/tennisRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("hello world!");
});

app.use("/users", userRouter);
app.use("/tennis", tennisRouter);

export { app };
