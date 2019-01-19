import { fetchApi } from './MiuApi';

export async function badWordsFeatureEnable(guildId: string): Promise<boolean> {
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${guildId}"}}) {
            badwordson
        }
    }`);
    return server.badwordson;
}

export async function getBadWords(guildId: string): Promise<string[]> {
    const { bad_words: words } = await fetchApi(`{
        bad_words (where: { serverId: { _eq: "${guildId}" } }) {
            word
        }
    }`);

    if (words.length < 1) {
        return [];
    } else {
        return words.map(({ word }: any) => word);
    }
}
