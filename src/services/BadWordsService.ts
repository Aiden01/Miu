import { Message } from 'discord.js';
import { badWordsFeatureEnable, getBadWords } from '../API/badWords';
import { log } from '../API/logger';

export default async function runService(message: Message): Promise<any> {
    const { guild, content } = message;
    const badWordsEnabled = await badWordsFeatureEnable(guild.id);

    if (!badWordsEnabled) {
        return;
    }
    const badWords = await getBadWords(guild.id);
    const containsBadWords = badWords.some(word =>
        content.toLowerCase().includes(word.toLowerCase())
    );

    if (containsBadWords) {
        message.delete();
        log('Message deleted automatically', '#524e8c', guild, {
            Reason: 'Bad words detected',
        }).catch(console.error);
        return message.reply(
            'Your message has been deleted, no bad words please.'
        );
    }
}
