import { Message } from 'discord.js';
import { badWordsFeatureEnable, getBadWords } from '../API/badWords';
import { log } from '../API/logger';
import { isAdmin } from '../utils';

export default async function runService(message: Message): Promise<any> {
    const { guild, content, author, member } = message;
    if (author.bot || isAdmin(member)) {
        return;
    }
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
        log('Message deleted automatically', '#29B6F6', guild, {
            Message: content,
            Reason: 'Bad words detected',
            User: `<@${author.id}>`,
        }).catch(console.error);
        return message.reply(
            'Your message has been deleted, no bad words please.'
        );
    }
}
