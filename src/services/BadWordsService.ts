import { Message } from 'discord.js';
import { badWordsFeatureEnable, getBadWords } from '../API/badWords';

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
        return message.reply(
            'Your message has been deleted, no bad words please.'
        );
    }
}
