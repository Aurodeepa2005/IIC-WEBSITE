import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all media coverage articles from the database.
 * Returns a plain JSON array of media coverage objects ordered by display_order ascending, then id ascending.
 * Route: GET /api/media-coverage
 */
export async function getMediaCoverage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const mediaCoverage = await prisma.mediaCoverage.findMany({
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

    res.status(200).json(mediaCoverage);
  } catch (error) {
    console.error("[media-coverage] Failed to fetch media coverage from database:", error);
    next(error);
  }
}
