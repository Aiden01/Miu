import { fetchApi } from './MiuApi';

export async function badWordsFeatureEnable(guildId: string): Promise<boolean> {
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${guildId}"}}) {
            badWordsOn
        }
    }`);
    return server.badWordsOn;
}
