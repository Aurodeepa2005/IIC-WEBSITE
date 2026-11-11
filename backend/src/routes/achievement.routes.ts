import { Router } from "express";
import { getAchievements } from "../controllers/achievement.controller";

const router = Router();

/**
 * Route: GET /api/achievements
 * Maps to getAchievements controller function.
 */
router.get("/", getAchievements);

export default router;
