import { z } from "astro/zod";

// Options for the getPlayer function
export const getPlayerSchema = z.object({
    uuid: z.string(),
    type: z.enum(["face", "head", "body"]),
});

// export types for the Schemas
export type PlayerOptions = z.infer<typeof getPlayerSchema>;