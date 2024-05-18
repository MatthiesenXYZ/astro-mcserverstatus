declare module 'virtual:astro-mcserverstatus/config' {
    const config: import('./src/schemas/index.ts').Options;
    export default config;
}

declare module 'astro-mcserverstatus:helpers' {
    export const getJavaStatus: typeof import('./src/lib/index.ts').getJavaStatus;
    export const getJavaIcon: typeof import('./src/lib/index.ts').getJavaIcon;
    export const getPlayer: typeof import('./src/lib/index.ts').getPlayer;
}