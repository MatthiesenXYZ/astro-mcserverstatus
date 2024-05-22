import superagent from "superagent";
import type { BedrockStatusResponse, getServerStatusOptions } from "../../../schemas";

export const getBedrockStatus = async ( opts: getServerStatusOptions ): Promise<BedrockStatusResponse> => {
    const url = opts.apiUrl?opts.apiUrl:'https://api.mcstatus.io/v2';
    const ip = opts.host;
    const p = opts.port?opts.port:19132;

    const result = await superagent.get(`${url}/status/bedrock/${ip}:${p}`);

    if (result.statusCode !== 200) {
        throw new Error(result.body);
    }

    return result.body as BedrockStatusResponse;
};