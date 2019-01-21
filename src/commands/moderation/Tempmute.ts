import { GuildMember, Message } from 'discord.js';
import { Bot } from '../../Bot';
import { confirmationEmbed, errorEmbed } from '../../embed';
import {
    alreadyMuted,
    getRole,
    isAdmin,
    parseTime,
    scheduleCb,
} from '../../utils';
import { muteUser, unMuteUser } from '../../utils/mute';

export default async function run(
    _: Bot,
    message: Message,
    [, time, ...rest]: string[]
): Promise<any> {
    const { author, mentions, guild, channel, member } = message;
    if (mentions.users.size < 1) {
        return channel.send('Invalid user');
    }
    const reason = rest.length >= 1 ? rest.join(' ') : 'Reason not defined';

    const toMute: GuildMember = guild.member(mentions.users.first());
    if (
        isAdmin(toMute) ||
        toMute === member ||
        !toMute ||
        alreadyMuted(toMute)
    ) {
        return channel.send(
            'Cannot mute this user, because he is already muted or he is a moderator.'
        );
    }

    try {
        const parsedTime = await parseTime(time);
        await muteUser(toMute, guild, reason, author);
        scheduleCb(parsedTime, () => unMuteUser(toMute, guild));
        return channel.send(
            `<@${toMute.id}> has been muted for: **${reason}**`
        );
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
