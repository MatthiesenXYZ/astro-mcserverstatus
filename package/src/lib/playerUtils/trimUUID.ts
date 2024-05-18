
export const trimUUID = ( uuid: string ): string => {
    if (uuid.includes('-')) {
        const newUUID = uuid.replace(/-/g, '');
        return newUUID;
    }
    return uuid;
};