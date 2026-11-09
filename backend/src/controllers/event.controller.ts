import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all events from the database.
 * Returns a plain JSON array of event objects ordered by display_order ascending, then id ascending.
 * Route: GET /api/events
 */
export async function getEvents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        image_path: true,
        description: true,
        display_order: true,
      },
      orderBy: [
        { display_order: "asc" },
        { id: "asc" },
      ],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("[events] Failed to fetch events from database:", error);
    next(error);
  }
}
