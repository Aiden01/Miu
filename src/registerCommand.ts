import { Bot } from "./Bot";

export default function registerCommand(bot: Bot) {
    bot
        .module("moderation", registerModModule)
        .module("misc", registerMiscModule);

}

function registerMiscModule() {
    return [{
        description: "Get the ping of the bot",
        handler: require('./commands/misc/Ping').default,
        name: "ping",
    }];
}

function registerModModule() {
    return [{
        argsName: ["Amount"],
        description: "Delete x message(s)",
        handler: require("./commands/moderation/Nuke").default,
        name: "nuke",
        numArgs: 1,
        permissions: ["manage_messages"],
    },
    {
        argsName: ["Member", "Reason"],
        description: "Mute a member",
        handler: require("./commands/moderation/Mute").default,
        minArgs: 1,
        name: "mute",
        permissions: ["manage_messages"],
    },
    {
        argsName: ["Member"],
        description: "Unmute a member",
        handler: require("./commands/moderation/Unmute").default,
        name: "unmute",
        numArgs: 1,
        permissions: ["manage_messages"],
    },
    {
        argsName: ["Member", "Reason"],
        description: "Kick a member",
        handler: require("./commands/moderation/Kick").default,
        minArgs: 1,
        name: "kick",
        permissions: ["KICK_MEMBERS"],
    }];
}
