import { z } from "astro/zod";

// Response schema for the status endpoint
export const StatusResponseSchema = z.object({
    online: z.boolean(),
    host: z.string(),
    port: z.number(),
    eula_blocked: z.boolean(),
    retrieved_at: z.number(),
    expires_at: z.number(),
});

export type StatusResponse = z.infer<typeof StatusResponseSchema>;