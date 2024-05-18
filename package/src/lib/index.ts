import superagent from 'superagent';

interface JavaStatusOptions {
	query?: boolean,
}

interface StatusResponse {
	online: boolean,
	host: string,
	port: number,
	eula_blocked: boolean,
	retrieved_at: number,
	expires_at: number
}

export interface JavaStatusResponse extends StatusResponse {
	version?: {
		name_raw: string,
		name_clean: string,
		name_html: string,
		protocol: number
	} | null,
	players?: {
		online: number,
		max: number,
		list: {
			uuid: string,
			name_raw: string,
			name_clean: string,
			name_html: string
		}[]
	},
	motd?: {
		raw: string,
		clean: string,
		html: string
	},
	icon?: string | null,
	mods?: {
		name: string,
		version: string
	}[],
	plugins?: {
		name: string,
		version: string
	}[],
	software?: string
}

export type getJavaStatusOptions = {
    host: string,
    port: number|undefined,
    options?: JavaStatusOptions|undefined,
    apiUrl: string|undefined
};

export const getJavaStatus = async (opts: getJavaStatusOptions): Promise<JavaStatusResponse> => {

    const { host } = opts;
    let { port, options, apiUrl } = opts;

    if (!port) {
        port = 25565;
    }
    if (!apiUrl) {
        apiUrl = "https://api.mcstatus.io/v2";
    }


    const result = await superagent.get(`${apiUrl}/status/java/${host}:${port}?query=${options?.query ?? true}`);

    if (result.statusCode !== 200) {
        throw new Error(result.body);
    }

    return result.body as JavaStatusResponse;
};

export const getJavaIcon = async (host: string, port = 25565): Promise<string> => {
    const result = await superagent.get(`https://api.mcstatus.io/v2/icon/${host}:${port}`);
    return result.body as string;
}