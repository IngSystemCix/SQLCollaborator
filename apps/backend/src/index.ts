import { serve } from "bun";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/router";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });

console.log(`🟢 Backend listening on http://localhost:${PORT}/trpc`);

serve({
  port: PORT,
  fetch: handler,
});
