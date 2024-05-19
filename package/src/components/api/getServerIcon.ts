import { getJavaIcon } from "astro-mcserverstatus:helpers";
import config from 'virtual:astro-mcserverstatus/config';
import type { getJavaStatusOptions } from "../../schemas";

// Get the icon of the server
export const getServerIcon = async (opts?: getJavaStatusOptions) => {
    
    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.options || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    const icon = getJavaIcon(Options.host, Options.port);
    return icon;
}