import { getJavaServerMOTD } from 'astro-mcserverstatus:helpers'
import config from 'virtual:astro-mcserverstatus/config'

// Get the MOTD of the server
export const getServerMOTD = async () => {
    const motd = await getJavaServerMOTD({host: config.serverAddress, port: config.serverPort, options: config.javaOptions, apiUrl: config.selfHostedAPI})
    return motd?.html ?? 'No MOTD found.'
}