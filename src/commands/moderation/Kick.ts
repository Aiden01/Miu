import { GuildMember, Message } from 'discord.js'
import { Bot } from '../../Bot'
import { confirmationEmbed, errorEmbed } from '../../embed'
import { isAdmin } from '../../utils'

export default async function run(
    { config }: Bot,
    message: Message,
    [, ...rest]: string[]
): Promise<any> {
    const { channel, member, guild, mentions, author } = message
    if (mentions.users.size < 1) {
        return channel.send('Invalid user')
    }

    const reason = rest.length >= 1 ? rest.join(' ') : 'Reason not defined'

    const toKick: GuildMember = guild.member(mentions.users.first())
    if (isAdmin(toKick) || toKick === member || !toKick) {
        return channel.send(
            'Cannot kick this user, either because he nor already muted or he is a moderator.'
        )
    }
    try {
        await toKick.send({
            embed: confirmationEmbed(
                'You have been kicked',
                reason,
                config.color,
                author
            ),
        })
        await toKick.kick(reason)
        await channel.send(`<@${toKick.id}> has been kicked for: **${reason}**`)
        return message.delete()
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) })
    }
}
