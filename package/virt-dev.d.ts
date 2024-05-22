declare module 'virtual:astro-mcserverstatus/config' {
    const config: import('./src/schemas/index.ts').Options;
    export default config;
}

declare module 'astro-mcserverstatus:helpers' {
    export const getJavaStatus: typeof import('./src/lib/index.ts').getJavaStatus;
    export const getJavaIcon: typeof import('./src/lib/index.ts').getJavaIcon;
    export const getPlayer: typeof import('./src/lib/index.ts').getPlayer;
    export const getJavaServerPlayers: typeof import('./src/lib/index.ts').getJavaServerPlayers;
    export const getJavaServerMOTD: typeof import('./src/lib/index.ts').getJavaServerMOTD;
    export const getBedrockStatus: typeof import('./src/lib/index.ts').getBedrockStatus;
    export const getBedrockServerPlayers: typeof import('./src/lib/index.ts').getBedrockServerPlayers;
    export const getBedrockServerMOTD: typeof import('./src/lib/index.ts').getBedrockServerMOTD;
}

declare module 'astro-mcserverstatus:helpers/schemas' {
    export const getPlayerSchema: typeof import('./src/schemas/playerUtils/index.ts').getPlayerSchema;
    export type PlayerOptions = import('./src/schemas/playerUtils/index.ts').PlayerOptions;
    export const getServerStatusOptionsSchema: typeof import('./src/schemas/serverUtils/index.ts').getServerStatusOptionsSchema;
    export type getServerStatusOptions = import('./src/schemas/serverUtils/index.ts').getServerStatusOptions;
    export const JavaStatusResponseSchema: typeof import('./src/schemas/serverUtils/index.ts').JavaStatusResponseSchema;
    export type JavaStatusResponse = import('./src/schemas/serverUtils/index.ts').JavaStatusResponse;
    export const motdSchema: typeof import('./src/schemas/serverUtils/index.ts').motdSchema;
    export const playerSchema: typeof import('./src/schemas/serverUtils/index.ts').playerSchema;
    export const StatusResponseSchema: typeof import('./src/schemas/serverUtils/index.ts').StatusResponseSchema;
    export type StatusResponse = import('./src/schemas/serverUtils/index.ts').StatusResponse;
    export const versionSchema: typeof import('./src/schemas/serverUtils/index.ts').versionSchema;
}

declare module 'astro-mcserverstatus:components/ssr' {
    export const ServerMOTD: typeof import('./src/components/ssr/ServerMOTD.astro').default;
    export const ServerBanner: typeof import('./src/components/ssr/ServerBanner.astro').default;
    export const ServerAddress: typeof import('./src/components/ssr/ServerAddress.astro').default;
    export const ServerIcon: typeof import('./src/components/ssr/ServerIcon.astro').default;
    export const OnlinePlayerList: typeof import('./src/components/ssr/OnlinePlayerList.astro').default;
}

declare module 'astro-mcserverstatus:components/api' {
    export const getServerIcon: typeof import('./src/components/api/index.ts').getServerIcon;
    export const getServerMOTD: typeof import('./src/components/api/index.ts').getServerMOTD;
    export const getServerPlayers: typeof import('./src/components/api/index.ts').getServerPlayers;
    export type PlayerHeadType = import('./src/components/api/index.ts').PlayerHeadType;
    export type ServerPlayerResponse = import('./src/components/api/index.ts').ServerPlayerResponse;
    export const getServerStatus: typeof import('./src/components/api/index.ts').getServerStatus;
    export const howLongAgo: typeof import('./src/components/api/index.ts').howLongAgo;
}

declare module 'astro-mcserverstatus:components/assets' {
    export const dirt: typeof import('./src/components/assets/index.ts').dirt;
    export const stone: typeof import('./src/components/assets/index.ts').stone;
    export const stoneBrick: typeof import('./src/components/assets/index.ts').stoneBrick;
    export const planks: typeof import('./src/components/assets/index.ts').planks;
    export const server_default: typeof import('./src/components/assets/index.ts').server_default;
}