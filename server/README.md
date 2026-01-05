To run the server, do `npm run dev`. this runs the typescript code directly from `src/index.ts` with auto-reload enabled

everytime you make changes to the schema in `prisma/schema.prisma`, you need to run `npx prisma migrate dev`. if you want to add a name for your migration for documentation purposes, you can add `--name <value>`
