import { addDts, addVirtualImports, createResolver, defineIntegration } from "astro-integration-kit";
import { getJavaStatus } from "./lib";
import { integrationLogger, makeMOTD, fileFactory } from "./utils";
import { optionsSchema, type getJavaStatusOptions } from "./schemas";

export default defineIntegration({
	name: "@matthiesenyxz/astro-mcserverstatus",
	optionsSchema,
	setup({ 
		name, 
		options: opts, 
		options: { 
			serverAddress,
			serverPort,
			javaOptions,
			selfHostedAPI,
			verbose 
		}
	}) {
		// Resolve the path to root of the integration
		const { resolve } = createResolver(import.meta.url);
		return {
			hooks: {
				"astro:config:setup": async (params) => {

					// Destructure the parameters
					const { logger } = params;

					// Map the options to variables
					const javaStatusOptions = { 
						host: serverAddress, 
						port: serverPort, 
						options: javaOptions, 
						apiUrl: selfHostedAPI 
					} as getJavaStatusOptions;

					// Log the setup of the integration
					integrationLogger(logger, verbose, "info", "Setting up mcServerStatus integration");

					// Check if the serverAddress is provided
					if (!serverAddress) {
						integrationLogger(logger, verbose, "error", "serverAddress is required to use mcServerStatus integration");
					}

					// Get the current status of the defined server
					const serverStatus = await getJavaStatus(javaStatusOptions);

					// Log the server status
					integrationLogger(logger, true, "info", makeMOTD(serverAddress, serverStatus, serverPort));

					// Create a virtual helper map
					const virtualHelperMap = `
					export * from '${resolve('./lib/index.ts')}';`;

					// Add the virtual imports
					addVirtualImports(params, {
						name, imports: {
							'virtual:astro-mcserverstatus/config': `export default ${JSON.stringify(opts)}`,
							'astro-mcserverstatus:helpers': virtualHelperMap,
						},
					});

					// Create a fileFactory for the integration's DTS File
					const serverStatusDTS = fileFactory();

					// Add the virtual imports to the DTS file
					serverStatusDTS.addLines(`declare module 'astro-mcserverstatus:helpers' {
						export const getJavaStatus: typeof import('${resolve('./lib/index.ts')}').getJavaStatus;
						export const getJavaIcon: typeof import('${resolve('./lib/index.ts')}').getJavaIcon;
						export const getPlayer: typeof import('${resolve('./lib/index.ts')}').getPlayer;
					}`);

					// Save the DTS file to the user's project
					addDts(params, { name, content: serverStatusDTS.text() });
				},
			},
		};
	},
});
