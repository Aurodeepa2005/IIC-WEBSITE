import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

// Basic email regex for validating structure (user@domain.tld)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valid phone characters: digits, spaces, +, -, (, )
const PHONE_CHARS_REGEX = /^[0-9\s+\-()]+$/;

/**
 * Validates incoming contact form payload and returns a list of error messages.
 * Only validates name, email, phone (optional), and message.
 */
function validateContactInput(body: any): {
  isValid: boolean;
  errors: string[];
  sanitizedData: {
    name: string;
    email: string;
    phone: string | null;
    message: string;
  };
} {
  const errors: string[] = [];

  // Extract only the four allowed fields; anything else is discarded
  const rawName = body?.name;
  const rawEmail = body?.email;
  const rawPhone = body?.phone;
  const rawMessage = body?.message;

  // 1. Validate name (required, 1-100 characters)
  let cleanName = "";
  if (typeof rawName !== "string" || rawName.trim().length === 0) {
    errors.push("name is required");
  } else {
    cleanName = rawName.trim();
    if (cleanName.length > 100) {
      errors.push("name must not exceed 100 characters");
    }
  }

  // 2. Validate email (required, valid format, max 255 characters)
  let cleanEmail = "";
  if (typeof rawEmail !== "string" || rawEmail.trim().length === 0) {
    errors.push("email is required");
  } else {
    cleanEmail = rawEmail.trim();
    if (cleanEmail.length > 255) {
      errors.push("email must not exceed 255 characters");
    } else if (!EMAIL_REGEX.test(cleanEmail)) {
      errors.push("email is not valid");
    }
  }

  // 3. Validate phone (optional; if provided, only digits/spaces/+/-/(/) and 7-15 digits total)
  let cleanPhone: string | null = null;
  if (rawPhone !== undefined && rawPhone !== null && String(rawPhone).trim() !== "") {
    const phoneStr = String(rawPhone).trim();
    if (!PHONE_CHARS_REGEX.test(phoneStr)) {
      errors.push("phone contains invalid characters");
    } else {
      const digitCount = phoneStr.replace(/\D/g, "").length;
      if (digitCount < 7 || digitCount > 15) {
        errors.push("phone must contain between 7 and 15 digits");
      } else {
        cleanPhone = phoneStr;
      }
    }
  }

  // 4. Validate message (required, 1-2000 characters)
  let cleanMessage = "";
  if (typeof rawMessage !== "string" || rawMessage.trim().length === 0) {
    errors.push("message is required");
  } else {
    cleanMessage = rawMessage.trim();
    if (cleanMessage.length > 2000) {
      errors.push("message must not exceed 2000 characters");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    },
  };
}

/**
 * Handles submission of contact form messages.
 * Validates request body, ignores extraneous fields (id, status, created_at),
 * saves to ContactMessage table with status "unread", and returns HTTP 201.
 * Route: POST /api/contact
 */
export async function submitContactMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { isValid, errors, sanitizedData } = validateContactInput(req.body);

    if (!isValid) {
      res.status(400).json({
        error: errors.join("; "),
      });
      return;
    }

    // Save only validated fields to the database; status defaults to "unread"
    await prisma.contactMessage.create({
      data: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        message: sanitizedData.message,
      },
    });

    // Return exact success confirmation without leaking database fields or row
    res.status(201).json({
      message: "Thank you, your message has been received.",
    });
  } catch (error) {
    console.error("[contact] Failed to save contact message:", error);
    next(error);
  }
}
