import { router, publicProcedure } from "@/trpc";
import { z } from "zod";
import { executeQuery } from "@/db";

export const queryRouter = router({
  runQuery: publicProcedure
    .input(z.object({
      type: z.enum(["mysql", "postgres", "sqlite", "mssql"]),
      host: z.string().optional(),
      port: z.number().optional(),
      user: z.string().optional(),
      password: z.string().optional(),
      database: z.string().optional(),
      filePath: z.string().optional(), // solo para SQLite
      query: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        const dbConfig = {
          ...input,
          host: input.host ?? "",
          port: input.port ?? 0,
          user: input.user ?? "",
          password: input.password ?? "",
          database: input.database ?? "",
          filePath: input.filePath ?? "",
        };
        const result = await executeQuery(dbConfig, input.query);
        return { success: true, result };
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message,
        };
      }
    }),
});
