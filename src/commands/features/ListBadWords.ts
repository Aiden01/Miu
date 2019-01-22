import { Message } from 'discord.js';
import { getBadWords } from '../../API/badWords';
import { Bot } from '../../Bot';
import { badWordsList, errorEmbed } from '../../embed';

export default async function run(
    { config: { color } }: Bot,
    { channel, guild: { id } }: Message,
    _: string[]
): Promise<any> {
    try {
        const badWords = await getBadWords(id);
        return channel.send({ embed: badWordsList(color, badWords) });
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
