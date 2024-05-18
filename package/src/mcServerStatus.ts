import { defineIntegration } from "astro-integration-kit";

export default defineIntegration({
	name: "@matthiesenyxz/astro-mcserverstatus",
	setup() {
		return {
			hooks: {
				"astro:config:setup": ({ logger }) => {
					logger.info("Hello from Astro mcServerStatus!");
				},
			},
		};
	},
});
