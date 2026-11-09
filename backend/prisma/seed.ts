import fs from "fs";
import path from "path";
import prisma from "../src/lib/prisma";

/**
 * Validates entries from a JSON file against model schema constraints.
 * Rejects unknown keys, missing required fields, and invalid enum/status values.
 */
function validateJsonFile<T extends Record<string, any>>(
  fileName: string,
  entries: any[],
  allowedKeys: string[],
  requiredKeys: string[],
  customValidator?: (entry: T, index: number) => void
): T[] {
  if (!Array.isArray(entries)) {
    throw new Error(`Validation Error in ${fileName}: Root JSON content must be an array of objects.`);
  }

  entries.forEach((entry, index) => {
    const entryIdentifier = entry.title || entry.name || `#${index + 1}`;

    if (typeof entry !== "object" || entry === null) {
      throw new Error(`Validation Error in ${fileName} (entry #${index + 1}): Entry must be a valid JSON object.`);
    }

    // Check for unexpected/unknown keys
    const entryKeys = Object.keys(entry);
    for (const key of entryKeys) {
      if (!allowedKeys.includes(key)) {
        throw new Error(
          `Validation Error in ${fileName} (entry #${index + 1} "${entryIdentifier}"): ` +
          `Unknown key "${key}". Allowed keys are: ${allowedKeys.join(", ")}`
        );
      }
    }

    // Check that required keys are present
    for (const reqKey of requiredKeys) {
      if (entry[reqKey] === undefined || entry[reqKey] === null || entry[reqKey] === "") {
        throw new Error(
          `Validation Error in ${fileName} (entry #${index + 1} "${entryIdentifier}"): ` +
          `Missing or empty required field "${reqKey}".`
        );
      }
    }

    // Run custom field-level validators (e.g., enum checks)
    if (customValidator) {
      customValidator(entry, index);
    }
  });

  return entries as T[];
}

/**
 * Reads and parses a JSON file from the backend/data directory.
 */
function readDataFile(fileName: string): any[] {
  const filePath = path.join(__dirname, "..", "data", fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed data file not found: ${filePath}`);
  }
  const rawData = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(rawData);
  } catch (err: any) {
    throw new Error(`JSON syntax error in ${fileName}: ${err.message}`);
  }
}

/**
 * Main database seed execution function.
 * Validates all data files upfront, then clears and re-inserts only the 6 content models
 * inside a single database transaction. ContactMessage is strictly NEVER touched.
 */
async function main() {
  console.log("=========================================");
  console.log(" IIC Website Database Seeding");
  console.log("=========================================");

  // 1. Read raw JSON files
  console.log("Loading JSON data files from backend/data/...");
  const rawProjects = readDataFile("projects.json");
  const rawEvents = readDataFile("events.json");
  const rawAchievements = readDataFile("achievements.json");
  const rawPatents = readDataFile("patents.json");
  const rawMediaCoverage = readDataFile("media_coverage.json");
  const rawTeamMembers = readDataFile("team_members.json");

  // 2. Validate all JSON data against model definitions
  console.log("Validating JSON records and constraints...");

  const projects = validateJsonFile(
    "projects.json",
    rawProjects,
    ["title", "description", "image_path", "display_order"],
    ["title", "description", "image_path"]
  );

  const events = validateJsonFile(
    "events.json",
    rawEvents,
    ["title", "description", "image_path", "display_order"],
    ["title", "description", "image_path"]
  );

  const achievements = validateJsonFile(
    "achievements.json",
    rawAchievements,
    ["title", "description", "image_path"],
    ["title", "description"]
  );

  const patents = validateJsonFile(
    "patents.json",
    rawPatents,
    ["title", "patent_number", "status", "attribution", "image_path", "display_order"],
    ["title"],
    (entry, index) => {
      if (entry.status !== undefined && entry.status !== null) {
        if (entry.status !== "filed" && entry.status !== "granted") {
          throw new Error(
            `Validation Error in patents.json (entry #${index + 1} "${entry.title}"): ` +
            `Invalid patent status "${entry.status}". Allowed values are 'filed', 'granted', or null.`
          );
        }
      }
    }
  );

  const mediaCoverage = validateJsonFile(
    "media_coverage.json",
    rawMediaCoverage,
    ["title", "description", "image_path", "display_order"],
    ["title", "description", "image_path"]
  );

  const teamMembers = validateJsonFile(
    "team_members.json",
    rawTeamMembers,
    ["name", "role", "member_type", "batch", "image_path", "linkedin_url", "github_url", "display_order"],
    ["name", "role", "member_type", "image_path"],
    (entry, index) => {
      if (entry.member_type !== "coordinator" && entry.member_type !== "member") {
        throw new Error(
          `Validation Error in team_members.json (entry #${index + 1} "${entry.name}"): ` +
          `Invalid member_type "${entry.member_type}". Allowed values are 'coordinator' or 'member'.`
        );
      }
    }
  );

  console.log("All data successfully validated!");

  // 3. Clear and re-insert ONLY the 6 content models in ONE single transaction
  // ContactMessage is explicitly excluded and preserved
  console.log("Executing atomic database transaction to seed content models...");

  await prisma.$transaction(async (tx) => {
    // Clear existing records from content tables in dependency-safe order
    console.log(" - Clearing existing content records...");
    await tx.project.deleteMany();
    await tx.event.deleteMany();
    await tx.achievement.deleteMany();
    await tx.patent.deleteMany();
    await tx.mediaCoverage.deleteMany();
    await tx.teamMember.deleteMany();

    // Re-insert validated entries
    console.log(` - Inserting ${projects.length} projects...`);
    await tx.project.createMany({ data: projects });

    console.log(` - Inserting ${events.length} events...`);
    await tx.event.createMany({ data: events });

    console.log(` - Inserting ${achievements.length} achievements...`);
    await tx.achievement.createMany({ data: achievements });

    console.log(` - Inserting ${patents.length} patents...`);
    await tx.patent.createMany({ data: patents });

    console.log(` - Inserting ${mediaCoverage.length} media coverage articles...`);
    await tx.mediaCoverage.createMany({ data: mediaCoverage });

    console.log(` - Inserting ${teamMembers.length} team members...`);
    await tx.teamMember.createMany({ data: teamMembers });
  });

  console.log("=========================================");
  console.log("Database seed completed successfully!");
  console.log("=========================================");
}

main()
  .catch((e) => {
    console.error("Seed execution failed:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
