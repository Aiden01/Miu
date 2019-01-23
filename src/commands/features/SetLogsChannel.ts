import { Message } from 'discord.js';
import { setLogsChannel } from '../../API/logger';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    { channel, mentions: { channels }, guild: { id } }: Message,
    args: string[]
): Promise<any> {
    const invalidChannelEmbed = errorEmbed('Invalid channel');
    if (channels.size < 1) {
        return channel.send({ embed: invalidChannelEmbed });
    }
    const logsChannel = channels.first();
    if (!logsChannel) {
        return channel.send({ embed: invalidChannelEmbed });
    }
    try {
        await setLogsChannel(id, logsChannel.id);
        return channel.send(
            'Logs channel changed successfully :white_check_mark:'
        );
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
