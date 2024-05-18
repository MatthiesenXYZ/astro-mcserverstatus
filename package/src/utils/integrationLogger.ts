import type { AstroIntegrationLogger } from "astro";
import { AstroError } from "astro/errors";
import chalk from 'chalk';
import type { JavaStatusResponse } from "../lib";

export const integrationLogger = async (
	logger: AstroIntegrationLogger,
	verbose: boolean,
	type: 'info' | 'warn' | 'error',
	message: string
) => {
	if (verbose) {
		if (type === 'info') {
			logger.info(message);
		} else if (type === 'warn') {
			logger.warn(message);
		} else if (type === 'error') {
			logger.error(message);
            throw new AstroError(message);
		}
	}
	if (!verbose) {
		if (type === 'warn') {
			logger.warn(message);
		} else if (type === 'error') {
			logger.error(message);
            throw new AstroError(message);
		}
	}
};

export const makeMOTD = ( 
    serverAddress: string, 
    serverStatus: JavaStatusResponse,
    serverPort = 25565, 
) => {

    const { online, players, motd } = serverStatus;

    const messages = [];
    
    const header = `\n${chalk.bgBlack.white(`Server Status for [${serverAddress}:${serverPort}] `)}`;

    messages.push(header);

    if (online) {
        const onlineMessage = chalk.bgBlack.green.bold(" - Server is Online");
        messages.push(onlineMessage);

        if (players) {
            const playersMessage = chalk.bgBlack.white(` - Players: ${players.online}/${players.max}`);
            messages.push(playersMessage);
        }

        if (motd){
            const motdMessage = chalk.bgBlack.white(` - Server MOTD:\n${motd.clean}`);
            messages.push(motdMessage);
        }

    } else {
        const offlineMessage = chalk.bgBlack.red.bold(' - Server is offline');
        messages.push(offlineMessage);
    }

    return messages.join('\n');

}