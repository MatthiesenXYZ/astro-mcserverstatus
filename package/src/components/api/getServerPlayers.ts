import { getJavaServerPlayers, getPlayer } from 'astro-mcserverstatus:helpers';
import config from 'virtual:astro-mcserverstatus/config';

type ServerPlayerResponse = {
    online: number;
    max: number;
    list: {
        name: string;
        image: string;
    }[];
} | undefined;

type PlayerHeadType = "face" | "head";

// Get the players of the server
export const getServerPlayers = async ( playerHeadType: PlayerHeadType ) => {
    const players = await getJavaServerPlayers({host: config.serverAddress, port: config.serverPort, options: config.javaOptions, apiUrl: config.selfHostedAPI})

    if (!players) {
        return { online: 0, max: 0, list: [] } as ServerPlayerResponse;
    }

    if (players.online === 0) {
        return { online: 0, max: players.max, list: [] } as ServerPlayerResponse;
    }

    if (players.online > 0) {
        const PlayerList = players.list.map(({ uuid, name_html }) => {
            return {
                name: name_html,
                image: getPlayer({uuid: uuid, type: playerHeadType})
            }
        })

        return { online: players.online, max: players.max, list: PlayerList } as ServerPlayerResponse;

    }

    return { online: 0, max: 0, list: [] } as ServerPlayerResponse;
}