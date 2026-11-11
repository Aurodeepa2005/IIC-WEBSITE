import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all patents from the database.
 * Returns a plain JSON array of patent objects ordered by display_order ascending, then id ascending.
 * Nullable fields (patent_number, status, attribution, image_path) are preserved as null.
 * Route: GET /api/patents
 */
export async function getPatents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const patents = await prisma.patent.findMany({
      select: {
        id: true,
        title: true,
        patent_number: true,
        status: true,
        attribution: true,
        image_path: true,
        display_order: true,
      },
      orderBy: [
        { display_order: "asc" },
        { id: "asc" },
      ],
    });

    res.status(200).json(patents);
  } catch (error) {
    console.error("[patents] Failed to fetch patents from database:", error);
    next(error);
  }
}
