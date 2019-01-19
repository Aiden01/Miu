import { Guild, RichEmbed, User } from 'discord.js'

export function confirmationEmbed(
    title: string,
    reason: string,
    color: string,
    moderator: User
): RichEmbed {
    return new RichEmbed()
        .setTitle(title)
        .addField('Reason', reason, true)
        .addField(
            'Moderator',
            `${moderator.username}#${moderator.discriminator}`
        )
        .setColor(color)
        .setDescription(
            'If you thing this is a mistake, please contact a moderator'
        )
}

export function serverInfo(
    {
        name,
        channels,
        iconURL,
        createdAt,
        memberCount,
        ownerID,
        roles,
        region,
    }: Guild,
    color: string
) {
    return new RichEmbed()
        .setColor(color)
        .setTitle(name)
        .setThumbnail(iconURL)
        .addField(
            'Creation at',
            `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`,
            true
        )
        .addField('Member count', memberCount, true)
        .addField('Owner', `<@${ownerID}>`, true)
        .addField('Role count', roles.size, true)
        .addField('Region', region, true)
        .addField(
            'Number of text channels',
            channels.filter(channel => channel.type === 'text').size,
            true
        )
        .addField(
            'Number of voice channels',
            channels.filter(channel => channel.type === 'voice').size,
            true
        )
}

export function pfpEmbed(
    { displayAvatarURL, username }: User,
    color: string
): RichEmbed {
    return new RichEmbed()
        .setColor(color)
        .setTitle(`${username}'s profile picture`)
        .setImage(displayAvatarURL)
}

export function errorEmbed(error: string): RichEmbed {
    return new RichEmbed()
        .setTitle('An error occurred')
        .setDescription(error)
        .setColor('#d32f2f')
}
