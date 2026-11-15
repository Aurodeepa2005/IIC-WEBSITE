import { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store mapping IP addresses to their request counts and window expiry
const ipStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 10 minutes to prevent memory accumulation
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now > record.resetTime) {
      ipStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Unref timer so it does not keep Node process running during exit/scripts
if (cleanupTimer.unref) {
  cleanupTimer.unref();
}

/**
 * Lightweight, zero-dependency in-memory rate limiter for contact submissions.
 * Limits each IP to 5 submissions per 15 minutes.
 * Returns HTTP 429 with { "error": "Too many messages. Please try again later." } when exceeded.
 */
export function contactRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15-minute window
  const maxRequests = 5;

  const current = ipStore.get(ip);

  // If no record exists or previous window expired, start a fresh window
  if (!current || now > current.resetTime) {
    ipStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return next();
  }

  // If request limit exceeded within active window
  if (current.count >= maxRequests) {
    res.status(429).json({
      error: "Too many messages. Please try again later.",
    });
    return;
  }

  // Increment hit count
  current.count += 1;
  next();
}

/**
 * Resets the rate limiter store (useful for testing or manual administrative resets).
 */
export function resetRateLimitStore(): void {
  ipStore.clear();
}
