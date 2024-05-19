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
}

declare module 'astro-mcserverstatus:components' {
    export const ServerMOTD: typeof import('./src/components/ServerMOTD.astro').default;
    export const ServerBanner: typeof import('./src/components/ServerBanner.astro').default;
    export const ServerAddress: typeof import('./src/components/ServerAddress.astro').default;
    export const ServerIcon: typeof import('./src/components/ServerIcon.astro').default;
    export const OnlinePlayerList: typeof import('./src/components/OnlinePlayerList.astro').default;
}

declare module 'astro-mcserverstatus:components/api' {
    export const getServerIcon: typeof import('./src/components/api/index.ts').getServerIcon;
    export const getServerMOTD: typeof import('./src/components/api/index.ts').getServerMOTD;
    export const getServerPlayers: typeof import('./src/components/api/index.ts').getServerPlayers;
    export type PlayerHeadType = import('./src/components/api/index.ts').PlayerHeadType;
    export type ServerPlayerResponse = import('./src/components/api/index.ts').ServerPlayerResponse;
    export const getServerStatus: typeof import('./src/components/api/index.ts').getServerStatus;
}