import { addDts, addVirtualImports, createResolver, defineIntegration } from "astro-integration-kit";
import { getJavaStatus } from "./lib";
import { integrationLogger, makeMOTD } from "./utils";
import { optionsSchema, type getJavaStatusOptions } from "./schemas";
import { serverStatusHelpersDTSFile, componentsDTSFile } from "./stubs";

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

					const virtualComponentMap = `
					export { default as ServerMOTD } from '${resolve('./components/ServerMOTD.astro')}';`;

					// Add the virtual imports
					addVirtualImports(params, {
						name, imports: {
							'virtual:astro-mcserverstatus/config': `export default ${JSON.stringify(opts)}`,
							'astro-mcserverstatus:helpers': virtualHelperMap,
							'astro-mcserverstatus:components': virtualComponentMap,
						},
					});

					// Save the DTS file to the user's project
					addDts(params, { name: 'astro-mcserverstatus-helpers', content: serverStatusHelpersDTSFile });
					addDts(params, { name: 'astro-mcserverstatus-components', content: componentsDTSFile });
				},
			},
		};
	},
});
