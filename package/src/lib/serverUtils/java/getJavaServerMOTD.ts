import type { JavaStatusResponse, getServerStatusOptions } from "../../../schemas";
import { getJavaStatus } from "./getJavaStatus";

export const getJavaServerMOTD = async (opts: getServerStatusOptions): Promise<JavaStatusResponse["motd"]> => {
    const serverStatus = await getJavaStatus(opts);

    if (serverStatus.online) {
        return serverStatus.motd;
    }
    return {} as JavaStatusResponse["motd"];
}