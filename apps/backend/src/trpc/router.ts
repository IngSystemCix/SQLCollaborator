import { router } from ".";
import { connectRouter } from "./routers/connect";
import { schemaRouter } from "./routers/schema";
import { queryRouter } from "./routers/query";

export const appRouter = router({
  connect: connectRouter,
  schema: schemaRouter,
  query: queryRouter,
});

export type AppRouter = typeof appRouter;
