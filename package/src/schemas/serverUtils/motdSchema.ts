import { z } from "astro/zod";

// motd schema for the Java server status response
export const motdSchema = z.object({
    raw: z.string(),
    clean: z.string(),
    html: z.string(),
}).optional();