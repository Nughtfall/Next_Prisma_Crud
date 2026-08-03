# Switch Project to MySQL — Task List

## Steps
- [x] Update `lib/prisma.js` (remove SQLite fallback, always use `DATABASE_URL`)
- [x] Update `README.md` for MySQL setup
- [x] `.env` updated with working MySQL credentials (`mysql://root:root123@127.0.0.1:3307/next_prisma_crud`)
- [x] Reset forgotten MySQL root password (now `root123`)
- [x] Run `npx prisma generate`
- [x] Run `npx prisma migrate dev --name init` (created `next_prisma_crud` database + tables)
- [x] Remove stale `prisma/dev.db` SQLite file
- [x] Verify with `npm run build` (build succeeded, BUILD_ID generated)
- [x] Confirm `.env` points to working MySQL (TiDB) connection string
