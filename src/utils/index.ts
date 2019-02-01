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

export const booksReactionEmojis = [
    '540878358041329675',
    '540877838769979393',
    '540878007384932352',
    '540877839180890133',
    '540877839277228032',
    '540877839034089482',
    '540877839101067265',
    '540877839009054722',
    '540877838941945866',
    '540877838941945876',
];

export function numberToEmoji(num: number): string {
    switch (num) {
        case 0:
            return '540878358041329675';
        case 1:
            return '540877838769979393';
        case 2:
            return '540878007384932352';
        case 3:
            return '540877839180890133';
        case 4:
            return '540877839277228032';
        case 5:
            return '540877839034089482';
        case 6:
            return '540877839101067265';
        case 7:
            return '540877839009054722';
        case 8:
            return '540877838941945866';
        case 9:
            return '540877838941945876';
        default:
            return '540877839180890133';
    }
}
