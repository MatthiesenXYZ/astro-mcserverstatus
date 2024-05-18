import { addVirtualImports, createResolver, defineIntegration } from "astro-integration-kit";
import { getJavaStatus } from "./lib";
import { fileFactory } from "./utils/fileFactory";
import { integrationLogger, makeMOTD } from "./utils/integrationLogger";
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

					integrationLogger(logger, verbose, "info", "Setting up mcServerStatus integration");

					if (!serverAddress) {
						integrationLogger(logger, verbose, "error", "serverAddress is required to use mcServerStatus integration");
					}

					const serverStatus = await getJavaStatus(serverAddress, serverPort, { ...javaOptions }, selfHostedAPI);

					integrationLogger(logger, true, "info", makeMOTD(serverAddress, serverStatus, serverPort));

					const virtualResolver = {
						JavaStatus: resolve('./lib/index.ts'),
					};

					const virtualImportMap = `
					export * from '${virtualResolver.JavaStatus}';`;

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
					}`);
				},
			},
		};
	},
});
