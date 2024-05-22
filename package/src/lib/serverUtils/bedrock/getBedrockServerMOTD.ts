import type { BedrockStatusResponse, getServerStatusOptions } from "../../../schemas";
import { getBedrockStatus } from "./getBedrockStatus";

export const getBedrockServerMOTD = async (opts: getServerStatusOptions): Promise<BedrockStatusResponse["motd"]> => {
    const serverStatus = await getBedrockStatus(opts);

    if (serverStatus.online) {
        return serverStatus.motd;
    }
    return {} as BedrockStatusResponse["motd"];
}