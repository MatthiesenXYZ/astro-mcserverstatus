import { getJavaServerMOTD } from 'astro-mcserverstatus:helpers'
import type { getJavaStatusOptions } from '../../schemas'

// Get the MOTD of the server
export const getServerMOTD = async (opts: getJavaStatusOptions) => {
    const motd = await getJavaServerMOTD(opts)
    return motd?.html ?? 'No MOTD found.'
}