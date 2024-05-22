import { getBedrockStatus, getJavaStatus } from "astro-mcserverstatus:helpers";
import config from 'virtual:astro-mcserverstatus/config';
import type { getServerStatusOptions } from "astro-mcserverstatus:helpers/schemas";


export const getServerStatus = async (opts?: getServerStatusOptions) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.JavaOptions || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    if (opts?.serverType === "java" || opts?.serverType === undefined) {
        const status = await getJavaStatus(Options);
        return status;
    }

    if (opts?.serverType === "bedrock" || Options.port === 19132) {
        const status = await getBedrockStatus(Options);
        return status;
    }

    const status = await getJavaStatus(Options);
    return status;
};
