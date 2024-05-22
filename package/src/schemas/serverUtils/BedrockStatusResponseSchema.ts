import { z } from "astro/zod";
import { StatusResponseSchema } from "./StatusResponseSchema";
import { motdSchema } from "./motdSchema";
import { bedrockVersionSchema } from "./bedrockVersionSchema";
import { bedrockPlayerSchema } from "./bedrockPlayerSchema";

// Java server status response schema for the getJavaStatus function
export const BedrockStatusResponseSchema = StatusResponseSchema.merge(z.object({
    version: bedrockVersionSchema,
    players: bedrockPlayerSchema,
    motd: motdSchema,
    gamemode: z.string().optional(),
    server_id: z.string().optional(),
    edition: z.enum(["MCPE", "MCEE"]).optional(),
}));

export type BedrockStatusResponse = z.infer<typeof BedrockStatusResponseSchema>;