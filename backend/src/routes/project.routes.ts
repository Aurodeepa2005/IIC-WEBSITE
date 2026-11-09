import { Router } from "express";
import { getProjects } from "../controllers/project.controller";

const router = Router();

/**
 * Route: GET /api/projects
 * Maps to getProjects controller function.
 */
router.get("/", getProjects);

export default router;
