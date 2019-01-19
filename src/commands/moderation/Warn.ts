import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { confirmationEmbed, errorEmbed } from '../../embed';
import { isAdmin } from '../../utils';

export default async function run(
    { config: { color } }: Bot,
    message: Message,
    [, ...warn]: string[]
): Promise<any> {
    const {
        mentions: { users },
        channel,
        member,
        guild,
        author,
    } = message;
    const warnMessage = warn.join(' ');

    if (users.size < 1) {
        return channel.send({ embed: errorEmbed('Invalid user') });
    }

    const target = guild.member(users.first());
    if (!target || isAdmin(target) || target === member) {
        return channel.send({
            embed: errorEmbed(
                "Cannot warn this user, either because he is a moderation or it's invalid"
            ),
        });
    }

    try {
        await target.send({
            embed: confirmationEmbed(
                'You have been warned',
                warnMessage,
                color,
                author
            ),
        });
        return Promise.all([
            channel.send(
                `<@${target.id}> has been warned for: **${warnMessage}**`
            ),
            message.delete(),
        ]);
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
