import type { BedrockStatusResponse, getServerStatusOptions } from "../../../schemas";
import { getBedrockStatus } from "./getBedrockStatus";

export const getBedrockServerPlayers = async (opts: getServerStatusOptions): Promise<BedrockStatusResponse["players"]> => {
    const serverStatus = await getBedrockStatus(opts);

    if (serverStatus.online) {
        return serverStatus.players;
    }
    return {} as BedrockStatusResponse["players"];
}