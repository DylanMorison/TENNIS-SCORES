import express from "express";
import { tennisControllers } from "../controllers/tennisControllers";
import { requireAuth } from "../middleware/requireAuth";

const tennisRouter = express.Router();

/**
 * @route  POST /api/tennis
 * @desc   Get Matches By Date
 **@access Protected
 */
tennisRouter.get("/matches-by-date/:Date", requireAuth, tennisControllers.getMatchesByDate);

export { tennisRouter };
