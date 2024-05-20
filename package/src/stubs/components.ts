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
	export const howLongAgo: typeof import('${resolve('../components/api/index.ts')}').howLongAgo;
}`);

componentsDTS.addLines(`declare module 'astro-mcserverstatus:components/ssr' {
	export const ServerMOTD: typeof import('${resolve('../components/ssr/ServerMOTD.astro')}').default;
	export const ServerBanner: typeof import('${resolve('../components/ssr/ServerBanner.astro')}').default;
	export const ServerAddress: typeof import('${resolve('../components/ssr/ServerAddress.astro')}').default;
	export const ServerIcon: typeof import('${resolve('../components/ssr/ServerIcon.astro')}').default;
	export const OnlinePlayerList: typeof import('${resolve('../components/ssr/OnlinePlayerList.astro')}').default;
}`);

componentsDTS.addLines(`declare module 'astro-mcserverstatus:components/assets' {
	export const dirt: typeof import('${resolve('../components/assets/index.ts')}').dirt;
	export const stone: typeof import('${resolve('../components/assets/index.ts')}').stone;
	export const stoneBrick: typeof import('${resolve('../components/assets/index.ts')}').stoneBrick;
	export const planks: typeof import('${resolve('../components/assets/index.ts')}').planks;
}`);

export const componentsDTSFile = componentsDTS.text();