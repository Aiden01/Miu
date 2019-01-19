import { RichEmbed, User } from "discord.js";

export function confirmationEmbed(title: string, reason: string, color: string, moderator: User): RichEmbed {
    return new RichEmbed()
        .setTitle(title)
        .addField("Reason", reason, true)
        .addField("Moderator", `${moderator.username}#${moderator.discriminator}`)
        .setColor(color)
        .setDescription("If you thing this is a mistake, please contact a moderator");
}
