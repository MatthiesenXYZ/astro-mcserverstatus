
export const getJavaIcon = ( host: string, port = 25565 ): string => {
    const result = `https://api.mcstatus.io/v2/icon/${host}:${port}`;
    return result as string;
};
