import { z } from "astro/zod";
import { StatusResponseSchema } from "./StatusResponseSchema";
import { versionSchema } from "./versionSchema";
import { playerSchema } from "./playerSchema";
import { motdSchema } from "./motdSchema";

// Java server status response schema for the getJavaStatus function
export const JavaStatusResponseSchema = StatusResponseSchema.merge(z.object({
    version: versionSchema,
    players: playerSchema,
    motd: motdSchema,
    icon: z.string().nullable(),
    mods: z.array(
        z.object({
            name: z.string(),
            version: z.string(),
        })
    ),
    plugins: z.array(
        z.object({
            name: z.string(),
            version: z.string(),
        })
    ),
    software: z.string().optional(),
}));

export type JavaStatusResponse = z.infer<typeof JavaStatusResponseSchema>;