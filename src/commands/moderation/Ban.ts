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
        return channel.send({ embed: errorEmbed('Invalid user') })
    }

    const reason = rest.length >= 1 ? rest.join(' ') : 'Reason not defined'

    const toBan: GuildMember = guild.member(mentions.users.first())
    if (isAdmin(toBan) || toBan === member || !toBan) {
        return channel.send({
            embed: errorEmbed(
                'Cannot ban this user, either because he is already muted nor he is a moderator.'
            ),
        })
    }
    try {
        await toBan.send({
            embed: confirmationEmbed(
                'You have been banned',
                reason,
                config.color,
                author
            ),
        })
        await toBan.ban(reason)
        await channel.send(`<@${toBan.id}> has been banned for: **${reason}**`)
        return message.delete()
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) })
    }
}
