# Idea Innovation Cell (IIC) - Backend API

The backend API for the Idea Innovation Cell (IIC), VSSUT Burla website. Built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL hosted on Neon.

---

## Features

- **TypeScript Architecture**: Fully typed with strict separation of routes, controllers, and middleware.
- **Prisma ORM & Neon PostgreSQL**: Uses connection pooling for high-concurrency runtime queries and direct connections for schema migrations.
- **RESTful Content Delivery**: Clean read-only endpoints returning flat JSON arrays for innovation projects, events, achievements, patents, media coverage, and team members.
- **Validated Contact Submissions**: Secure contact endpoint with input sanitization, length limits, regex validation, and in-memory rate limiting (5 requests / 15 minutes per IP).
- **Safety & Error Handling**: Centralized error middleware ensuring database errors and stack traces are never leaked to clients.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v20+ or v22+
- **npm**: v10+
- **PostgreSQL Database**: Free-tier serverless PostgreSQL on [Neon](https://neon.tech).

### 2. Installation
Navigate to the backend directory and install dependencies:
```bash
cd iicnew/backend
npm install
```

### 3. Environment Setup
Copy the `.env.example` file to create your `.env` file:
```bash
cp .env.example .env
```
Populate the environment variables inside `.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Neon Connection Strings
DATABASE_URL="postgresql://[user]:[password]@[neon_hostname]-pooler.[region].aws.neon.tech/[dbname]?sslmode=require"
DIRECT_URL="postgresql://[user]:[password]@[neon_hostname].[region].aws.neon.tech/[dbname]?sslmode=require"
```
- `DATABASE_URL`: Connection pooled URL (contains `-pooler` in hostname) for Prisma Client runtime.
- `DIRECT_URL`: Direct connection URL (without `-pooler`) for running Prisma migrations.

### 4. Database Migrations & Prisma Client
Apply database migrations to your Neon database:
```bash
npx prisma migrate deploy
```
Generate Prisma Client:
```bash
npx prisma generate
```

### 5. Database Seeding
Populate the 6 content models (`projects`, `events`, `achievements`, `patents`, `media_coverage`, `team_members`) from JSON data files in `backend/data/`:
```bash
npm run seed
```
*(Note: Seeding runs within an atomic transaction and never wipes or touches the `contact_messages` table).*

---

## Running the Server

### Development Mode (with hot-reload via tsx):
```bash
npm run dev
```
Starts the server with automatic TypeScript compilation and live reloading on file changes.

### Production Build & Execution:
1. Build TypeScript to JavaScript (`dist/` folder):
   ```bash
   npm run build
   ```
2. Start the production Node server:
   ```bash
   npm start
   ```

### Inspect Database (Prisma Studio):
```bash
npx prisma studio
```
Opens interactive database GUI at `http://localhost:5555`.

---

## API Endpoints Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body | Response Fields / Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health & uptime inspection | None | `{ "status": "ok", "service": "iic-backend", "uptimeSeconds": number, "timestamp": string }` |
| `GET` | `/projects` | All innovation projects (ordered by `display_order ASC, id ASC`) | None | `[ { "id": number, "title": string, "description": string, "image_path": string, "display_order": number } ]` |
| `GET` | `/events` | All events and workshops (ordered by `display_order ASC, id ASC`) | None | `[ { "id": number, "title": string, "image_path": string, "description": string, "display_order": number } ]` |
| `GET` | `/achievements` | All awards and laurels (ordered by `id ASC`) | None | `[ { "id": number, "title": string, "description": string, "image_path": string \| null } ]` |
| `GET` | `/patents` | All filed/granted patents (ordered by `display_order ASC, id ASC`) | None | `[ { "id": number, "title": string, "patent_number": string \| null, "status": "filed" \| "granted" \| null, "attribution": string \| null, "image_path": string \| null, "display_order": number } ]` |
| `GET` | `/media-coverage`| All news and media coverage (ordered by `display_order ASC, id ASC`) | None | `[ { "id": number, "title": string, "description": string, "image_path": string, "display_order": number } ]` |
| `GET` | `/team` | All coordinators and members flat list (ordered by `display_order ASC, id ASC`) | None | `[ { "id": number, "name": string, "role": string, "member_type": "coordinator" \| "member", "batch": string \| null, "image_path": string, "linkedin_url": string \| null, "github_url": string \| null, "display_order": number } ]` |
| `POST`| `/contact` | Submit contact form (rate limit: 5 submissions / 15 mins per IP) | `{ "name": string, "email": string, "phone"?: string, "message": string }` | **201**: `{ "message": "Thank you, your message has been received." }`<br>**400**: `{ "error": "validation details" }`<br>**429**: `{ "error": "Too many messages. Please try again later." }` |
