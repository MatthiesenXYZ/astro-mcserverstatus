import { z } from "astro/zod";

// version schema for the Java server status response
export const javaVersionSchema = z.object({
    name_raw: z.string(),
    name_clean: z.string(),
    name_html: z.string(),
    protocol: z.number().optional(),
}).nullable();