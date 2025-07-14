import { router, publicProcedure } from "@/trpc";
import { z } from "zod";
import { getSchema } from "@/db";

export const schemaRouter = router({
  getSchema: publicProcedure
    .input(z.object({
      type: z.enum(["mysql", "postgres", "sqlite", "mssql"]),
      host: z.string().optional(),
      port: z.number().optional(),
      user: z.string().optional(),
      password: z.string().optional(),
      database: z.string().optional(),
      filePath: z.string().optional(), // solo para SQLite
    }))
    .query(async ({ input }) => {
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
        const schema = await getSchema(dbConfig);
        return { success: true, schema };
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message,
        };
      }
    }),
});
