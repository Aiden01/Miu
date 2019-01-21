import { GuildMember, Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';
import { alreadyMuted, getRole, isAdmin } from '../../utils';
import { unMuteUser } from '../../utils/mute';

export default async function run(
    _: Bot,
    message: Message,
    args: string[]
): Promise<any> {
    const { member, mentions, guild, channel } = message;
    if (mentions.users.size < 1) {
        return channel.send('Invalid user');
    }

    const toUnmute: GuildMember = guild.member(mentions.users.first());
    if (isAdmin(toUnmute) || toUnmute === member || !alreadyMuted(toUnmute)) {
        return channel.send(
            'Cannot unmute this user, because he is not muted or he is a moderator.'
        );
    }

    try {
        await unMuteUser(toUnmute, guild);
        return channel.send(`<@${toUnmute.id}> has been unmuted`);
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
