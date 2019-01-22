import { Message } from 'discord.js';
import { getBadWords, removeBadWord } from '../../API/badWords';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    { channel, guild }: Message,
    badWords: string[]
): Promise<any> {
    const confirmationMessage = (await channel.send(
        'Removing bad words...'
    )) as Message;
    badWords = [...new Set(badWords)];

    const existingWords = await getBadWords(guild.id);
    try {
        for (const word of badWords) {
            if (existingWords.includes(word)) {
                await removeBadWord(guild.id, word).catch(console.log);
            }
        }
        return confirmationMessage.edit('Bad words removed :white_check_mark:');
    } catch (e) {
        return confirmationMessage.edit({ embed: errorEmbed(e.toString()) });
    }
}
