import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all achievements from the database.
 * Returns a plain JSON array of achievement objects ordered by id ascending.
 * Route: GET /api/achievements
 */
export async function getAchievements(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const achievements = await prisma.achievement.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image_path: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(achievements);
  } catch (error) {
    console.error("[achievements] Failed to fetch achievements from database:", error);
    next(error);
  }
}
