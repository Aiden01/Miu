import { Guild, GuildMember, User } from 'discord.js';
import { getRole } from '.';
import { confirmationEmbed, logEmbed } from '../embed';

export async function muteUser(
    user: GuildMember,
    guild: Guild,
    reason: string,
    moderator: User
): Promise<any> {
    const role = await getRole(guild, 'muted');
    await user.addRole(role);
    return user.send({
        embed: confirmationEmbed(
            'You have been muted',
            reason,
            '#524e8c',
            moderator
        ),
    });
}

export async function unMuteUser(
    user: GuildMember,
    guild: Guild
): Promise<any> {
    const role = await getRole(guild, 'muted');
    await user.removeRole(role);
    return user.send({ embed: logEmbed('You have been unmuted', '#524e8c') });
}
