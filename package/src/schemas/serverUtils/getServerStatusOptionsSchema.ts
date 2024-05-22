import { z } from "astro/zod";

// Options for the getJavaStatus function
export const getServerStatusOptionsSchema = z.object({
    host: z.string(),
    port: z.number().optional(),
    JavaOptions: z.object({
        query: z.boolean().optional(),
    }).optional(),
    apiUrl: z.string().optional(),
    serverType: z.enum(["java", "bedrock"]).optional(),
});

export type getServerStatusOptions = z.infer<typeof getServerStatusOptionsSchema>;