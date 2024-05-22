import { getJavaIcon } from "astro-mcserverstatus:helpers";
import config from 'virtual:astro-mcserverstatus/config';
import type { getServerStatusOptions } from "astro-mcserverstatus:helpers/schemas";
import { AstroError } from "astro/errors";

// Get the icon of the java server

/**
 * Gets the Server-Icon of any defined Java server
 */
export const getServerIcon = async (opts?: getServerStatusOptions) => {
    
    if (opts?.serverType !== "java" || opts?.serverType !== undefined) throw new AstroError(`Invalid Server Type: Expected 'java' but got '${opts?.serverType}`, "The function 'getServerIcon' only supports Java servers.");

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.JavaOptions || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    const icon = getJavaIcon(Options.host, Options.port);
    return icon;
}