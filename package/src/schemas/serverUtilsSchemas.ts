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

// Response schema for the status endpoint
export const StatusResponseSchema = z.object({
    online: z.boolean(),
    host: z.string(),
    port: z.number(),
    eula_blocked: z.boolean(),
    retrieved_at: z.number(),
    expires_at: z.number(),
});

// version schema for the Java server status response
const versionSchema = z.object({
    name_raw: z.string(),
    name_clean: z.string(),
    name_html: z.string(),
    protocol: z.number().optional(),
}).nullable();

// player schema for the Java server status response
const playerSchema = z.object({
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

// motd schema for the Java server status response
const motdSchema = z.object({
    raw: z.string(),
    clean: z.string(),
    html: z.string(),
}).optional();

// Java server status response schema for the getJavaStatus function
export const JavaStatusResponse = StatusResponseSchema.merge(z.object({
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

// Export types for the schemas
export type getJavaStatusOptions = z.infer<typeof getJavaStatusOptionsSchema>;
export type StatusResponse = z.infer<typeof StatusResponseSchema>;
export type JavaStatusResponse = z.infer<typeof JavaStatusResponse>;