import { createResolver } from "astro-integration-kit";
import { fileFactory } from "../utils";

const { resolve } = createResolver(import.meta.url);
const componentsDTS = fileFactory();

componentsDTS.addLines(`declare module 'astro-mcserverstatus:components' {
	export const ServerMOTD: typeof import('${resolve('../components/ServerMOTD.astro')}').default;
}`);

export const componentsDTSFile = componentsDTS.text();