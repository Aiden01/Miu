import { Client, Message } from 'discord.js';
import runBadWordsService from '../services/BadWordsService';

export default {
    onReady(client: Client) {
        client.user.setActivity('~~help');
    },
    onMessage(message: Message) {
        runBadWordsService(message).catch(console.error);
    },
};
