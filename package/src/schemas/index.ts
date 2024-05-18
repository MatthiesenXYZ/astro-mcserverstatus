import { z } from "astro/zod";

export const optionsSchema = z.object({
    /**
     * The IP address or Domain of the Minecraft server
     */
	serverAddress: z.string(),
    /**
     * The port of the Minecraft server
     */
	serverPort: z.number().optional(),
    /**
     * Options for the Java server status query
     */
	javaOptions: z.object({
        /**
         * Whether to query the server using the Minecraft query protocol
         */
		query: z.boolean().optional().default(true),
	}).optional(),
    /**
     * OPTIONAL: The URL of a self-hosted mcstatus API
     */
	selfHostedAPI: z.string().optional(),
    /**
     * Whether to log verbose output
     */
	verbose: z.boolean().optional().default(false),
});

export type Options = z.infer<typeof optionsSchema>;
