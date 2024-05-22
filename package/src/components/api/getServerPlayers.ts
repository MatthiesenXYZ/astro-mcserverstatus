import { getBedrockServerPlayers, getJavaServerPlayers, getPlayer } from 'astro-mcserverstatus:helpers';
import type { getServerStatusOptions } from "astro-mcserverstatus:helpers/schemas";
import config from 'virtual:astro-mcserverstatus/config';

export type JavaServerPlayerResponse = {
    online: number;
    max: number;
    list: {
        name: string;
        alt: string;
        image: string;
    }[];
} | undefined;

export type BedrockServerPlayerResponse = {
    online: number;
    max: number;
} | undefined;

export type PlayerHeadType = "face" | "head";

// Get the players of the server
export const getServerPlayers = async ( opts?: getServerStatusOptions, playerHeadType?: PlayerHeadType ) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.JavaOptions || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    if (opts?.serverType === "java" || opts?.serverType === undefined) {
        const players = await getJavaServerPlayers(Options)
    
        if (!players) {
            return { online: 0, max: 0, list: [] } as JavaServerPlayerResponse;
        }
    
        if (players.online === 0) {
            return { online: 0, max: players.max, list: [] } as JavaServerPlayerResponse;
        }
    
        const headType = playerHeadType || "head";
    
        if (players.online > 0) {
            const PlayerList = players.list.map(({ uuid, name_html, name_clean }) => {
                return {
                    name: name_html,
                    alt: name_clean,
                    image: getPlayer({uuid: uuid, type: headType})
                }
            })
    
            return { online: players.online, max: players.max, list: PlayerList } as JavaServerPlayerResponse;
    
        }
    }

    if (opts?.serverType === "bedrock" || Options.port === 19132) {
        const players = await getBedrockServerPlayers(Options)

        if (!players) {
            return { online: 0, max: 0 } as BedrockServerPlayerResponse;
        }

        return { online: players.online, max: players.max } as BedrockServerPlayerResponse;
    }

    return { online: 0, max: 0, list: [] } as JavaServerPlayerResponse;
}