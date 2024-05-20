import { createResolver } from "astro-integration-kit";
import { fileFactory } from "../utils";

const { resolve } = createResolver(import.meta.url);
const helpersDTS = fileFactory();

helpersDTS.addLines(`declare module 'astro-mcserverstatus:helpers' {
	export const getJavaStatus: typeof import('${resolve('../lib/index.ts')}').getJavaStatus;
	export const getJavaIcon: typeof import('${resolve('../lib/index.ts')}').getJavaIcon;
	export const getPlayer: typeof import('${resolve('../lib/index.ts')}').getPlayer;
	export const getJavaServerPlayers: typeof import('${resolve('../lib/index.ts')}').getJavaServerPlayers;
	export const getJavaServerMOTD: typeof import('${resolve('../lib/index.ts')}').getJavaServerMOTD;
}`);

helpersDTS.addLines(`declare module 'astro-mcserverstatus:helpers/schemas' {
	export const getPlayerSchema: typeof import('${resolve('../schemas/playerUtils/helpers.ts')}').getPlayerSchema;
	export type PlayerOptions = import('${resolve('../schemas/playerUtils/helpers.ts')}').PlayerOptions;
	export const getJavaStatusOptionsSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').getJavaStatusOptionsSchema;
	export type getJavaStatusOptions = import('${resolve('../schemas/serverUtils/helpers.ts')}').getJavaStatusOptions;
	export const JavaStatusResponseSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').JavaStatusResponseSchema;
	export type JavaStatusResponse = import('${resolve('../schemas/serverUtils/helpers.ts')}').JavaStatusResponse;
	export const motdSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').motdSchema;
	export const playerSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').playerSchema;
	export const StatusResponseSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').StatusResponseSchema;
	export type StatusResponse = import('${resolve('../schemas/serverUtils/helpers.ts')}').StatusResponse;
	export const versionSchema: typeof import('${resolve('../schemas/serverUtils/helpers.ts')}').versionSchema;
}`);

export const helpersDTSFile = helpersDTS.text();