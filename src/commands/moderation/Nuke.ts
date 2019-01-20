import { Message } from 'discord.js';
import { log } from '../../API/logger';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    { config }: Bot,
    msg: Message,
    [n]: string[]
): Promise<any> {
    const { channel, guild, author } = msg;
    const nb = parseInt(n, 10);
    if (Number.isNaN(nb)) {
        return channel.send({
            embed: errorEmbed(
                'Please specify the amount of messages to delete'
            ),
        });
    }
    if (nb > 100) {
        return channel.send({
            embed: errorEmbed('Cannot delete more than 100 messages'),
        });
    }

    await channel.bulkDelete(nb);
    log('Messages deleted', config.color, guild, {
        Amount: nb,
        Moderator: `<@${author.id}>`,
    });
    return msg.delete();
}
