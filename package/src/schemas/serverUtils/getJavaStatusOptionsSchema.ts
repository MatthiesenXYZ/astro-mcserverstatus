import { z } from "astro/zod";

// Options for the getJavaStatus function
export const getJavaStatusOptionsSchema = z.object({
    host: z.string(),
    port: z.number().optional(),
    options: z.object({
        query: z.boolean().optional(),
    }).optional(),
    apiUrl: z.string().optional(),
});

export type getJavaStatusOptions = z.infer<typeof getJavaStatusOptionsSchema>;