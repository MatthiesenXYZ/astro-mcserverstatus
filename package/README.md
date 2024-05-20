# Astro-MCServerStatus

Astro components and helper functions to get your minecraft server displayed on your astro SSR website!

## Usage

### Prerequisites

- Astro SSR project with an Adapter Setup* *(This will be changed later once non SSR components are added)*

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add @matthiesenxyz/astro-mcserverstatus
```

```bash
npx astro add @matthiesenxyz/astro-mcserverstatus
```

```bash
yarn astro add @matthiesenxyz/astro-mcserverstatus
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add @matthiesenxyz/astro-mcserverstatus
```

```bash
npm install @matthiesenxyz/astro-mcserverstatus
```

```bash
yarn add @matthiesenxyz/astro-mcserverstatus
```

2. Add the integration to your astro config

```diff
+import mcServerStatus from "@matthiesenxyz/astro-mcserverstatus";

export default defineConfig({
  integrations: [
+    mcServerStatus({
+        serverAddress: "your.serverip.here",
+        serverPort: 25565 //OPTIONAL - Default is: `25565`
+    }),
  ],
});
```

### Basic Usage

This integration has multiple ways to use it.  Currently this integration is only supported while `output: "server"` is enabled in your astro config* *(Until Static compatible components are released)*

Once you have the server details configured in your astro project you can now use the components from the virtual module!

Example usage:

```tsx
// src/pages/index.astro (without a Layout defined)
---
import { ServerIcon, ServerBanner, OnlinePlayerList } from "astro-mcserverstatus:components/ssr"
import { getServerIcon } from "astro-mcserverstatus:components/api"

const favicon = await getServerIcon()
---
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Example</title>
		<link rel="icon" type="image/x-icon" href={favicon}>
	</head>
	<body>
		<h1>Example</h1>
		<div>
			<h2>Server Icon without Banner</h2>
			<ServerIcon />
		</div>

		<div>
			<h2>Server Banner</h2>
			<ServerBanner/>
		</div>

		<div>
			<h3>Online Player List</h3>
			<OnlinePlayerList />
		</div>
</html>

```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/matthiesenxyz/astro-mcserverstatus/blob/main/LICENSE). Made with ❤️ by [Adam Matthiesen](https://github.com/Adammatthiesen).

