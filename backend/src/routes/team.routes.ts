import { Router } from "express";
import { getTeam } from "../controllers/team.controller";

const router = Router();

/**
 * Route: GET /api/team
 * Maps to getTeam controller function.
 */
router.get("/", getTeam);

export default router;
