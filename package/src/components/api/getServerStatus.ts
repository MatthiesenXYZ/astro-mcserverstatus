import { getJavaStatus } from "astro-mcserverstatus:helpers";
import config from 'virtual:astro-mcserverstatus/config';
import type { getJavaStatusOptions } from "astro-mcserverstatus:helpers/schemas";


export const getServerStatus = async (opts?: getJavaStatusOptions) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.options || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    const status = await getJavaStatus(Options);
    return status;
};
