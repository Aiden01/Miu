import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed, serversList } from '../../embed';

export default function run(
    { config: { ownerId, color }, guilds }: Bot,
    { channel, author }: Message,
    _: string[]
): Promise<any> {
    if (author.id !== ownerId) {
        return channel.send({
            embed: errorEmbed(
                "You don't have the permission to run this command."
            ),
        });
    }
    return channel.send({ embed: serversList(guilds, color) });
}
