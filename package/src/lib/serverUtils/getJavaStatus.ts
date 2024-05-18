import superagent from "superagent";
import type { JavaStatusResponse, getJavaStatusOptions } from "../../schemas";

export const getJavaStatus = async ( opts: getJavaStatusOptions ): Promise<JavaStatusResponse> => {
    const url = opts.apiUrl?opts.apiUrl:'https://api.mcstatus.io/v2';
    const ip = opts.host;
    const p = opts.port?opts.port:25565;
    const query = opts.options?.query?opts.options.query:true;

    const result = await superagent.get(`${url}/status/java/${ip}:${p}?query=${query ?? true}`);

    if (result.statusCode !== 200) {
        throw new Error(result.body);
    }

    return result.body as JavaStatusResponse;
};