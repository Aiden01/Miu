import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { aboutEmbed } from '../../embed';

export default function run(
    bot: Bot,
    { channel }: Message,
    _: string[]
): Promise<any> {
    const {
        config: { color, ownerId },
    } = bot;
    return channel.send({ embed: aboutEmbed(color, ownerId, bot) });
}
