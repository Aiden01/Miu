import { GuildMember, Message } from 'discord.js';
import { log } from '../../API/logger';
import { Bot } from '../../Bot';
import { confirmationEmbed, errorEmbed } from '../../embed';
import { isAdmin } from '../../utils';

export default async function run(
    { config: { color } }: Bot,
    message: Message,
    [, ...rest]: string[]
): Promise<any> {
    const { channel, member, guild, mentions, author } = message;
    if (mentions.users.size < 1) {
        return channel.send('Invalid user');
    }

    const reason = rest.length >= 1 ? rest.join(' ') : 'Reason not defined';

    const toKick: GuildMember = guild.member(mentions.users.first());
    if (isAdmin(toKick) || toKick === member || !toKick) {
        return channel.send('Cannot kick this user.');
    }
    try {
        await toKick.send({
            embed: confirmationEmbed(
                'You have been kicked',
                reason,
                color,
                author
            ),
        });
        await toKick.kick(reason);
        log('Member kicked', color, guild, {
            Member: `<@${toKick.id}>`,
            Moderator: `<@${member.id}>`,
            Reason: reason,
        });
        return channel.send(
            `<@${toKick.id}> has been kicked for: **${reason}**`
        );
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
