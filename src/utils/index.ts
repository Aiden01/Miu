import { Guild, GuildMember, Role, User } from 'discord.js';

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

export function parseTime(t: string): Promise<number> {
    const str = t[t.length - 1];
    const validStr = ['d', 's', 'h', 'm'];
    const matches: any = {
        d: 60 * 60 * 24,
        h: 60 * 60,
        m: 60,
        s: 1,
    };

    if (!validStr.includes(str)) {
        return Promise.reject(new Error('Invalid timestamp'));
    } else {
        const time = parseInt(t.slice(0, t.length - 1), 10);
        if (Number.isNaN(time)) {
            return Promise.reject(new Error('Invalid timestamp'));
        } else {
            const match = matches[str];
            return Promise.resolve(match * 1000 * time);
        }
    }
}

export function scheduleCb(time: number, cb: any) {
    setTimeout(cb, time);
}

export function humanReadableTime(seconds: number): string {
    const secondsOneDay = 60 * 60 * 24;
    const secondsOneHour = 60 * 60;
    const secondsOneMinute = 60;

    if (seconds >= secondsOneDay) {
        return `${Math.floor(seconds / secondsOneDay)} day(s)`;
    } else {
        if (seconds >= secondsOneHour) {
            return `${Math.floor(seconds / secondsOneHour)} hour(s)`;
        } else {
            if (seconds >= secondsOneMinute) {
                return `${Math.floor(seconds / secondsOneMinute)} minute(s)`;
            } else {
                return `${seconds} second(s)`;
            }
        }
    }
}
