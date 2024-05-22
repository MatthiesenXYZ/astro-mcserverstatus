import { getBedrockServerMOTD, getJavaServerMOTD } from 'astro-mcserverstatus:helpers'
import type { getServerStatusOptions } from "astro-mcserverstatus:helpers/schemas"
import config from 'virtual:astro-mcserverstatus/config'

// Get the MOTD of the server
/**
 * Gets the Message of the Day (MOTD) of any defined server
 * 
 * To get the MOTD of a Bedrock server, set the `serverType` to `"bedrock"` or use the default port `19132`
 *  
 */
export const getServerMOTD = async (opts?: getServerStatusOptions) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.JavaOptions || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    if (opts?.serverType === "java" || opts?.serverType === undefined) {
        const motd = await getJavaServerMOTD(Options)
        return motd?.html ?? "<span>Failed to connect to server</span>\n<span>Connection timed out: no further information</span>"
    } 
    
    if (opts?.serverType === "bedrock" || Options.port === 19132) {
        const motd = await getBedrockServerMOTD(Options)
        return motd?.html ?? "<span>Failed to connect to server</span>\n<span>Connection timed out: no further information</span>"
    }
}