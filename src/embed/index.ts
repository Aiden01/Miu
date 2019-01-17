import { RichEmbed, User } from "discord.js";

export function muteConfirmation(reason: string, color: string, moderator: User): RichEmbed {
    return new RichEmbed()
        .setTitle("You have been muted")
        .addField("Reason", reason, true)
        .addField("Moderator", `${moderator.username}#${moderator.discriminator}`)
        .setColor(color)
        .setDescription("If you thing this is a mistake, please contact a moderator");
}
export function kickConfirmation(reason: string, color: string, moderator: User): RichEmbed {
    return new RichEmbed()
        .setTitle("You have been kicked")
        .addField("Reason", reason, true)
        .addField("Moderator", `${moderator.username}#${moderator.discriminator}`)
        .setColor(color)
        .setDescription("If you thing this is a mistake, please contact a moderator");
}

export function unmuteConfirmation(color: string, moderator: User): RichEmbed {
    return new RichEmbed()
        .setTitle("You have been unmuted")
        .addField("Moderator", `${moderator.username}#${moderator.discriminator}`)
        .setColor(color);
}
