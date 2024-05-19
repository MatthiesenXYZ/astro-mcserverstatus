import { createResolver } from "astro-integration-kit";
import { fileFactory } from "../utils";

const { resolve } = createResolver(import.meta.url);
const componentsDTS = fileFactory();

componentsDTS.addLines(`declare module 'astro-mcserverstatus:components/api' {
	export const getServerIcon: typeof import('${resolve('../components/api/index.ts')}').getServerIcon;
	export const getServerMOTD: typeof import('${resolve('../components/api/index.ts')}').getServerMOTD;
	export const getServerPlayers: typeof import('${resolve('../components/api/index.ts')}').getServerPlayers;
	export type PlayerHeadType = import('${resolve('../components/api/index.ts')}').PlayerHeadType;
	export type ServerPlayerResponse = import('${resolve('../components/api/index.ts')}').ServerPlayerResponse;
	export const getServerStatus: typeof import('${resolve('../components/api/index.ts')}').getServerStatus;
}`);

componentsDTS.addLines(`declare module 'astro-mcserverstatus:components' {
	export const ServerMOTD: typeof import('${resolve('../components/ServerMOTD.astro')}').default;
	export const ServerBanner: typeof import('${resolve('../components/ServerBanner.astro')}').default;
	export const ServerAddress: typeof import('${resolve('../components/ServerAddress.astro')}').default;
	export const ServerIcon: typeof import('${resolve('../components/ServerIcon.astro')}').default;
}`);

export const componentsDTSFile = componentsDTS.text();