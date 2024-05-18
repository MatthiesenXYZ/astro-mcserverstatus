import { defineConfig } from "astro/config";
import mcServerStatus from "@matthiesenyxz/astro-mcserverstatus";

// https://astro.build/config
export default defineConfig({
	integrations: [
		mcServerStatus({
			serverAddress: "play.station48.xyz",
			javaOptions: {
				query: true,
			},
		})
	],
});
