import express from "express";
import { userControllers } from "../controllers/userControllers";
import { requireAuth } from "../middleware/requireAuth";

const userRouter = express.Router();

/**
 * @route  POST /api/users
 * @desc   Get User
 * @res    { email: string; }
 **@access Protected
 */
userRouter.get("/", requireAuth, userControllers.getUser);

/**
 * @route  POST /api/users
 * @desc   Register User
 * @res    type = { email: string; token: string }
 *!@access Public
 */
userRouter.post("/signup", userControllers.signup);

/**
 * @route  POST /api/users
 * @desc   Sign in User
 * @res    type = { email: string; token: string }
 *!@access Public
 */
userRouter.post("/signin", userControllers.signin);

export { userRouter };
