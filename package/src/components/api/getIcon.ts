import { getJavaIcon } from "astro-mcserverstatus:helpers";
import config from "virtual:astro-mcserverstatus/config";

// Get the icon of the server
export const getServerIcon = async () => {
    const icon = getJavaIcon(config.serverAddress, config.serverPort);
    return icon;
}