import { Guild, GuildMember, Role } from 'discord.js';

export function isAdmin(member: GuildMember) {
    return member.hasPermission('BAN_MEMBERS');
}

export function flatArray(arr: any[]): any[] {
    return [].concat(...arr);
}

export function alreadyMuted(user: GuildMember) {
    return user.roles.find(role => role.name.toLowerCase() === 'muted');
}

export function getRole(guild: Guild, roleName: string): Promise<Role> {
    const role = guild.roles.find(
        r => r.name.toLowerCase() === roleName.toLowerCase()
    );
    if (role) {
        return Promise.resolve(role);
    } else {
        return Promise.reject(new Error('Impossible de trouver le role'));
    }
}
