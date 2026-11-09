import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all projects from the database.
 * Returns a plain JSON array of project objects ordered by display_order ascending, then id ascending.
 * Route: GET /api/projects
 */
export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image_path: true,
        display_order: true,
      },
      orderBy: [
        { display_order: "asc" },
        { id: "asc" },
      ],
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("[projects] Failed to fetch projects from database:", error);
    next(error);
  }
}
