import { Client, Guild, Message } from 'discord.js';
import { fetchApi } from '../API/MiuApi';
import runBadWordsService from '../services/BadWordsService';

export default {
    onReady(client: Client) {
        client.user.setActivity('~~help');
    },
    onMessage(message: Message) {
        runBadWordsService(message).catch(console.error);
    },
    async guildCreate({ id }: Guild) {
        try {
            const { servers } = await fetchApi(`{
                servers(where: {serverId: {_eq: "${id}"}}) {
                    id
                    }
                }`);

            if (servers.length < 1) {
                await fetchApi(`
                    mutation insert_servers {
                        insert_servers(objects: [{serverId: "${id}"}]) {
                        affected_rows
                    }
                }`);
            }
        } catch (e) {
            console.error(e);
        }
    },
};
