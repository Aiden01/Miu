import { Bot } from './Bot'

export default function registerCommand(bot: Bot) {
    bot.module('moderation', registerModModule)
        .module('misc', registerMiscModule)
        .module('utility', registerUtilityModule)
}

function registerUtilityModule() {
    return [
        {
            description: 'Get general information about the server',
            handler: require('./commands/utility/ServerInfo').default,
            name: 'serverinfo',
        },
    ]
}

function registerMiscModule() {
    return [
        {
            description: 'Get the ping of the bot',
            handler: require('./commands/misc/Ping').default,
            name: 'ping',
        },
        {
            description: 'Send a link to lmgtfy',
            handler: require('./commands/misc/Lmgtfy').default,
            minArgs: 1,
            name: 'lmgtfy',
        },
        {
            description: 'Send the profile picture of a member',
            handler: require('./commands/misc/Pfp').default,
            minArgs: 1,
            name: 'pfp',
        },
    ]
}

function registerModModule() {
    return [
        {
            argsName: ['Amount'],
            description: 'Delete x message(s)',
            handler: require('./commands/moderation/Nuke').default,
            name: 'nuke',
            numArgs: 1,
            permissions: ['manage_messages'],
        },
        {
            argsName: ['Member', 'Reason'],
            description: 'Mute a member',
            handler: require('./commands/moderation/Mute').default,
            minArgs: 1,
            name: 'mute',
            permissions: ['manage_messages'],
        },
        {
            argsName: ['Member'],
            description: 'Unmute a member',
            handler: require('./commands/moderation/Unmute').default,
            name: 'unmute',
            numArgs: 1,
            permissions: ['manage_messages'],
        },
        {
            argsName: ['Member', 'Reason'],
            description: 'Kick a member',
            handler: require('./commands/moderation/Kick').default,
            minArgs: 1,
            name: 'kick',
            permissions: ['KICK_MEMBERS'],
        },
        {
            argsName: ['Member', 'Nickname'],
            description: 'Rename someone',
            handler: require('./commands/moderation/Nick').default,
            minArgs: 2,
            name: 'nick',
            permissions: ['MANAGE_NICKNAMES'],
        },
        {
            argsName: ['Member', 'Reason'],
            description: 'Ban a member',
            handler: require('./commands/moderation/Ban').default,
            minArgs: 1,
            name: 'ban',
            permissions: ['BAN_MEMBERS'],
        },
    ]
}
