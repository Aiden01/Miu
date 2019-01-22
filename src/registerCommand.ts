import { Bot } from './Bot';

export default function registerCommand(bot: Bot) {
    bot.module('moderation', registerModModule)
        .module('misc', registerMiscModule)
        .module('utility', registerUtilityModule)
        .module('features', registerFeaturesModule);
}

function registerUtilityModule() {
    return [
        {
            description: 'Get general information about the server',
            handler: require('./commands/utility/ServerInfo').default,
            name: 'serverinfo',
        },
        {
            description: 'Get information about the bot',
            handler: require('./commands/utility/About').default,
            name: 'about',
        },
    ];
}

function registerFeaturesModule() {
    return [
        {
            argsName: ['Features'],
            description: 'Enable one or more features',
            handler: require('./commands/features/EnableFeature').default,
            minArgs: 1,
            name: 'enablefeature',
            permissions: ['MANAGE_GUILD'],
        },
        {
            argsName: ['Features'],
            description: 'Disable one or more features',
            handler: require('./commands/features/DisableFeature').default,
            minArgs: 1,
            name: 'disablefeature',
            permissions: ['MANAGE_GUILD'],
        },
        {
            argsName: ['Words'],
            description: 'Add one or more bad words',
            handler: require('./commands/features/AddBadWords').default,
            minArgs: 1,
            name: 'addbadwords',
            permissions: ['MANAGE_GUILD'],
        },
    ];
}

function registerMiscModule() {
    return [
        {
            description: 'Get the ping of the bot',
            handler: require('./commands/misc/Ping').default,
            name: 'ping',
        },
        {
            argsName: ['Query'],
            description: 'Send a link to lmgtfy',
            handler: require('./commands/misc/Lmgtfy').default,
            minArgs: 1,
            name: 'lmgtfy',
        },
        {
            argsName: ['Member'],
            description: 'Send the profile picture of a member',
            handler: require('./commands/misc/Pfp').default,
            minArgs: 1,
            name: 'pfp',
        },
        {
            argsName: ['Choice'],
            description: 'Play Rock-Paper-Scissors with the bot',
            handler: require('./commands/misc/Rps').default,
            name: 'rps',
            numArgs: 1,
        },
        {
            description: 'Get the awesome quote of the day',
            handler: require('./commands/misc/Quote').default,
            name: 'quote',
        },
    ];
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
            argsName: ['Member', 'Time', 'Reason'],
            description: 'Mute a member for a specific time',
            handler: require('./commands/moderation/Tempmute').default,
            minArgs: 2,
            name: 'tempmute',
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
        {
            argsName: ['Member', 'Message'],
            description: 'Warn a member',
            handler: require('./commands/moderation/Warn').default,
            minArgs: 2,
            name: 'warn',
            permissions: ['manage_messages'],
        },
    ];
}
