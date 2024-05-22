import { z } from "astro/zod";

export const bedrockPlayerSchema = z.object({
    online: z.number(),
    max: z.number(),
}).optional();