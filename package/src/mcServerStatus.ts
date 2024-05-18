import { addVirtualImports, createResolver, defineIntegration } from "astro-integration-kit";
import { getJavaStatus } from "./lib";
import { fileFactory } from "./utils/fileFactory";
import { integrationLogger } from "./utils/integrationLogger";
import { optionsSchema } from "./schemas";

export default defineIntegration({
	name: "@matthiesenyxz/astro-mcserverstatus",
	optionsSchema,
	setup({ name, options }) {
		return {
			hooks: {
				"astro:config:setup": async (params) => {

					const { resolve } = createResolver(import.meta.url);
					const { logger } = params;
					const { serverAddress, serverPort, javaOptions, selfHostedAPI, verbose } = options;

					logger.info("Setting up mcServerStatus integration");

					if (!serverAddress) {
						integrationLogger(logger, verbose, "error", "serverAddress is required to use mcServerStatus integration");
					}

					const serverStatus = await getJavaStatus(serverAddress, serverPort, { ...javaOptions }, selfHostedAPI);

					logger.info(`Server status for ${serverAddress}:${serverPort} is ${serverStatus.online ? "online" : "offline"}${serverStatus.online && ` with ${serverStatus.players?.online ?? 0}/${serverStatus.players?.max ?? 0} players`}`)

					const virtualResolver = {
						JavaStatus: resolve('./lib/index.ts'),
					}

					const virtualImportMap = `
					export * from '${virtualResolver.JavaStatus}';`

					addVirtualImports(params, {
						name,
						imports: {
							'virtual:astro-mcserverstatus/config': `export default ${JSON.stringify(options)}`,
							'astro-mcserverstatus:helpers': virtualImportMap,
						},
					});

					const serverStatusDTS = fileFactory();

					serverStatusDTS.addLines(`declare module 'astro-mcserverstatus:helpers' {
						export const getJavaStatus: typeof import('${virtualResolver.JavaStatus}').getJavaStatus;
						export const getJavaIcon: typeof import('${virtualResolver.JavaStatus}').getJavaIcon;
					}`)
				},
			},
		};
	},
});
