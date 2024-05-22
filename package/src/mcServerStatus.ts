import { addDts, addVirtualImports, createResolver, defineIntegration } from "astro-integration-kit";
import { getJavaStatus } from "./lib";
import { integrationLogger, makeMOTD } from "./utils";
import { optionsSchema, type getServerStatusOptions } from "./schemas";
import { helpersDTSFile, componentsDTSFile } from "./stubs";

export default defineIntegration({
	name: "@matthiesenxyz/astro-mcserverstatus",
	optionsSchema,
	setup({ 
		name, 
		options: opts, 
		options: { 
			serverAddress,
			serverPort,
			serverType,
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
						serverType: serverType,
						apiUrl: selfHostedAPI 
					} as getServerStatusOptions;

					// Log the setup of the integration
					integrationLogger(logger, verbose, "info", "Setting up mcServerStatus integration");

					// Check if the serverAddress is provided
					if (!serverAddress) {
						integrationLogger(logger, verbose, "error", "serverAddress is required to use mcServerStatus integration");
					}

					if (serverType === "java") {
						// Get the current status of the defined server
						const serverStatus = await getJavaStatus(javaStatusOptions);
	
						// Log the server status
						integrationLogger(logger, true, "info", makeMOTD(serverAddress, serverStatus, serverPort));
					}

					// Add the virtual imports
					addVirtualImports(params, {
						name, imports: {
							'virtual:astro-mcserverstatus/config': `export default ${JSON.stringify(opts)}`,
							'astro-mcserverstatus:helpers': `export * from '${resolve('./lib/index.ts')}';`,
							'astro-mcserverstatus:helpers/schemas': `export * from '${resolve('./schemas/helpers.ts')}';`,
							'astro-mcserverstatus:components/ssr': `export * from '${resolve('./components/ssr/index.ts')}';`,
							'astro-mcserverstatus:components/api': `export * from '${resolve('./components/api/index.ts')}';`,
							'astro-mcserverstatus:components/assets': `export * from '${resolve('./components/assets/index.ts')}';`,
						},
					});

					// Save the DTS file to the user's project
					addDts(params, { 
						name: 'astro-mcserverstatus-helpers', 
						content: helpersDTSFile 
					});
					addDts(params, { 
						name: 'astro-mcserverstatus-components', 
						content: componentsDTSFile 
					});
				},
			},
		};
	},
});
