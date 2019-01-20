import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    msg: Message,
    [n]: string[]
): Promise<any> {
    const { channel } = msg;
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
    return msg.delete();
}
