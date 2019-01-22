import { Message } from 'discord.js';
import { addBadWord, getBadWords } from '../../API/badWords';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    { channel, guild }: Message,
    badWords: string[]
): Promise<any> {
    const confirmationMessage = (await channel.send(
        'Adding new bad words...'
    )) as Message;
    badWords = [...new Set(badWords)];

    const existingWords = await getBadWords(guild.id);
    try {
        for (const word of badWords) {
            if (!existingWords.includes(word)) {
                await addBadWord(guild.id, word);
            }
        }
        return confirmationMessage.edit('Bad words added :white_check_mark:');
    } catch (e) {
        return confirmationMessage.edit({ embed: errorEmbed(e.toString()) });
    }
}
