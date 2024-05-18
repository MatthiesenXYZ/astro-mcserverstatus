import type { PlayerOptions } from "../schemas";

const trimUUID = ( uuid: string ): string => {
    if (uuid.includes('-')) {
        const newUUID = uuid.replace(/-/g, '');
        return newUUID;
    }
    return uuid;
};

export const getPlayer = ( opts: PlayerOptions ): string => {
    if (opts.type === "face" || opts.type === "head"){
        const result = `https://api.mineatar.io/${opts.type}/${trimUUID(opts.uuid)}?scale=16`;
        return result;
    }
    if (opts.type === "body"){
        const result = `https://api.mineatar.io/body/full/${trimUUID(opts.uuid)}?scale=16`;
        return result;
    }
    throw new Error("Invalid type");
};