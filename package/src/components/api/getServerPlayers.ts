import { getJavaServerPlayers, getPlayer } from 'astro-mcserverstatus:helpers';
import type { getJavaStatusOptions } from '../../schemas';
import config from 'virtual:astro-mcserverstatus/config';

export type ServerPlayerResponse = {
    online: number;
    max: number;
    list: {
        name: string;
        alt: string;
        image: string;
    }[];
} | undefined;

export type PlayerHeadType = "face" | "head";

// Get the players of the server
export const getServerPlayers = async ( opts?: getJavaStatusOptions, playerHeadType?: PlayerHeadType ) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.options || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    const players = await getJavaServerPlayers(Options)

    if (!players) {
        return { online: 0, max: 0, list: [] } as ServerPlayerResponse;
    }

    if (players.online === 0) {
        return { online: 0, max: players.max, list: [] } as ServerPlayerResponse;
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

        return { online: players.online, max: players.max, list: PlayerList } as ServerPlayerResponse;

    }

    return { online: 0, max: 0, list: [] } as ServerPlayerResponse;
}