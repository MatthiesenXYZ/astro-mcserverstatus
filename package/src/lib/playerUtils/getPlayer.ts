import type { PlayerOptions } from "../../schemas";
import { trimUUID } from "./trimUUID";

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