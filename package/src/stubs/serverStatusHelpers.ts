import { createResolver } from "astro-integration-kit";
import { fileFactory } from "../utils";

const { resolve } = createResolver(import.meta.url);
const serverStatusHelpersDTS = fileFactory();

serverStatusHelpersDTS.addLines(`declare module 'astro-mcserverstatus:helpers' {
	export const getJavaStatus: typeof import('${resolve('../lib/index.ts')}').getJavaStatus;
	export const getJavaIcon: typeof import('${resolve('../lib/index.ts')}').getJavaIcon;
	export const getPlayer: typeof import('${resolve('../lib/index.ts')}').getPlayer;
	export const getJavaServerPlayers: typeof import('${resolve('../lib/index.ts')}').getJavaServerPlayers;
	export const getJavaServerMOTD: typeof import('${resolve('../lib/index.ts')}').getJavaServerMOTD;
}`);

export const serverStatusHelpersDTSFile = serverStatusHelpersDTS.text();