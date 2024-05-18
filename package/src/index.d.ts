import type { Options } from './schemas/index.ts';
import type { AstroIntegration } from 'astro';

/**
 * An Astro integration that provides Components and Helper functions for querying 
 * the status of a Minecraft Server using the Minecraft query protocol in Astro!
 * 
 * @example
 * ```tsx
 * import { defineConfig } from 'astro';
 * import mcServerStatus from '@matthiesenyxz/astro-mcserverstatus';
 * 
 * export default defineConfig({
 *   integrations: [
 *     mcServerStatus({
 *       serverAddress: 'mc.hypixel.net',
 *       serverPort: 25565,
 *       javaOptions: {
 *         query: true
 *       },
 *      verbose: false,
 *     }),
 *   ],
 * });
 * ```
 */
export default function mcServerStatus(opts: Options): AstroIntegration;