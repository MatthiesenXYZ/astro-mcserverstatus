import type { JavaStatusResponse, getJavaStatusOptions } from "../../schemas";
import { getJavaStatus } from "./getJavaStatus";

export const getJavaServerPlayers = async (opts: getJavaStatusOptions): Promise<JavaStatusResponse["players"]> => {
    const serverStatus = await getJavaStatus(opts);

    if (serverStatus.online) {
        return serverStatus.players;
    }
    return {} as JavaStatusResponse["players"];
}