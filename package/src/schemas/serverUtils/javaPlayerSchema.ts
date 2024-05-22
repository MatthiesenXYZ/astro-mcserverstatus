import { z } from "astro/zod";

// player schema for the Java server status response
export const javaPlayerSchema = z.object({
    online: z.number(),
    max: z.number(),
    list: z.array(
        z.object({
            uuid: z.string(),
            name_raw: z.string(),
            name_clean: z.string(),
            name_html: z.string(),
        })
    ),
}).optional();