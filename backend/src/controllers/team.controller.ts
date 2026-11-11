import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Retrieves all team members from the database as a flat list.
 * Returns a plain JSON array of team member objects ordered by display_order ascending, then id ascending.
 * Fields: id, name, role, member_type ("coordinator" | "member"), batch, image_path, linkedin_url, github_url, display_order.
 * Route: GET /api/team
 */
export async function getTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        member_type: true,
        batch: true,
        image_path: true,
        linkedin_url: true,
        github_url: true,
        display_order: true,
      },
      orderBy: [
        { display_order: "asc" },
        { id: "asc" },
      ],
    });

    res.status(200).json(teamMembers);
  } catch (error) {
    console.error("[team] Failed to fetch team members from database:", error);
    next(error);
  }
}
