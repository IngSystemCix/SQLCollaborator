import { z } from "zod";
import { createDBConnection } from "@/db";
import { publicProcedure, router } from "..";

const testConnectionSchema = z.object({
  type: z.enum(["mysql", "postgres", "sqlite", "mssql"]),
  host: z.string().optional(),
  port: z.number().optional(),
  user: z.string().optional(),
  password: z.string().optional(),
  database: z.string().optional(),
  filePath: z.string().optional(), // solo SQLite
});

export const connectRouter = router({
  testConnection: publicProcedure
    .input(testConnectionSchema)
    .mutation(async ({ input }: { input: z.infer<typeof testConnectionSchema> }) => {
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

        const db = await createDBConnection(dbConfig);
        return { success: true };
      } catch (err) {
        console.error("Error de conexión:", err);
        return { success: false, message: (err as Error).message };
      }
    }),
});
