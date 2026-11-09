import { PrismaClient } from "@prisma/client";

/**
 * Global singleton pattern for PrismaClient.
 * In development, hot-reloading (via tsx watch) can create new instances of
 * PrismaClient and exhaust available database connections. Attaching it to
 * globalThis preserves a single client instance across code reloads.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
