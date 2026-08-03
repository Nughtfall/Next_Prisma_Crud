# Next Prisma CRUD

A simple Next.js + Prisma blog app with posts, drafts, comments, and publish support.

## Features

- List published posts
- Create drafts and publish them
- Add and delete comments on posts
- Prisma ORM with MySQL
- Uses `getServerSideProps` for Vercel-friendly database rendering

## Prerequisites

- MySQL server running locally (the project's `.env` points to port `3307`)
- A database named `next_prisma_crud` created in MySQL, or it will be created by the migration

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure the database connection:

The `.env` file is already set up for MySQL. If it does not exist, copy `.env.example`:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env` if your MySQL user/password/host/port differ:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/next_prisma_crud"
```

3. Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the local development server:

```bash
npm run dev
```

## Build

To build the app locally:

```bash
npm run build
```

## Vercel Deployment Notes

- This project now uses `getServerSideProps` for `/` and `/drafts`, which avoids build-time database collection issues on Vercel.
- Make sure Vercel has the `DATABASE_URL` environment variable set in the project settings.
- For Vercel, use a hosted database such as MySQL (e.g., PlanetScale, Aiven) and update `DATABASE_URL` accordingly.
- The `next` dependency was upgraded to `14.2.35` to avoid the known security issue in `14.2.15`.

## GitHub

The project is pushed to GitHub at:

`https://github.com/Nughtfall/Next_Prisma_Crud`

## Notes

- Do not commit your `.env` file.
- If you add new Prisma models, run `npx prisma migrate dev` again and redeploy.
