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

export async function addBadWord(serverId: string, word: string): Promise<any> {
    return fetchApi(`
        mutation insert_bad_words {
            insert_bad_words(objects: [
                { word: "${word}", serverId: "${serverId}" }
            ]) {
                affected_rows
            }
    }`);
}

export async function removeBadWord(
    serverId: string,
    word: string
): Promise<any> {
    return fetchApi(`
        mutation delete_bad_words {
            delete_bad_words(
                where: { word: { _eq: "${word}" }, serverId: { _eq: "${serverId}" } }
            ) {
                affected_rows
            }
    }`);
}
