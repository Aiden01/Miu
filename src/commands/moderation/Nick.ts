import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    msg: Message,
    [, ...nickname]: string[]
): Promise<any> {
    const { mentions, channel, guild } = msg;
    if (mentions.users.size < 1) {
        return channel.send('Invalid user');
    }
    const target = guild.member(mentions.users.first());
    try {
        await target.setNickname(nickname.join(' '));
        await channel.send(`<@${target.id}> has been renamed`);
        return await msg.delete();
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
