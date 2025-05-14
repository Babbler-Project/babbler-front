import { z } from "zod";

const configSchema = z.object({
  API: z.object({
    BASE_URL: z.string().url(),
    TIMEOUT: z.number().positive(),
  }),
  APP: z.object({
    ENV: z.enum(["development", "test", "production"]),
    VERSION: z.string(),
  }),
});

type Config = z.infer<typeof configSchema>;

const config = {
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    TIMEOUT: 10000,
  },
  APP: {
    ENV: import.meta.env.MODE || "development",
    VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  },
} as const;

try {
  configSchema.parse(config);
} catch (error) {
  console.error("Invalid configuration:", error);
  throw new Error("Application configuration is invalid");
}

export { config };
