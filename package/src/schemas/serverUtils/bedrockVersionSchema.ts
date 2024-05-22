import { z } from "astro/zod";

export const bedrockVersionSchema = z.object({
    name: z.string(),
    protocol: z.number(),
}).optional();