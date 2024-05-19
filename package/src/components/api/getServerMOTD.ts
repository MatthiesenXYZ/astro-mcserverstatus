import { getJavaServerMOTD } from 'astro-mcserverstatus:helpers'
import type { getJavaStatusOptions } from '../../schemas'
import config from 'virtual:astro-mcserverstatus/config'

// Get the MOTD of the server
export const getServerMOTD = async (opts?: getJavaStatusOptions) => {

    const Options = {
        host: opts?.host || config.serverAddress,
        port: opts?.port || config.serverPort,
        options: opts?.options || config.javaOptions,
        apiUrl: opts?.apiUrl || config.selfHostedAPI
    }

    const motd = await getJavaServerMOTD(Options)
    return motd?.html ?? "<span>Failed to connect to server</span>\n<span>Connection timed out: no further information</span>"
}