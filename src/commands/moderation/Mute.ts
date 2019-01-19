import { GuildMember, Message } from "discord.js";
import { Bot } from "../../Bot";
import { confirmationEmbed } from "../../embed";
import { alreadyMuted, getRole, isAdmin } from "../../utils";

export default async function run({ config }: Bot, message: Message, [, ...rest]: string[]): Promise<any> {
    const { author, mentions, guild, channel, member } = message;
    if (mentions.users.array().length < 1) { return channel.send("Invalid user"); }
    const reason = rest.length >= 1 ? rest.join(" ") : "Reason not defined";

    const toMute: GuildMember = guild.member(mentions.users.first());
    if (isAdmin(toMute) || toMute === member || !toMute || alreadyMuted(toMute)) {
        return channel.send("Cannot mute this user, because he is already muted or he is a moderator.");
    }

    try {
        const role = await getRole(guild, "muted");
        await toMute.addRole(role);
        await channel.send(`<@${toMute.id}> has been muted for: **${reason}**`);
        await toMute.send({ embed: confirmationEmbed("You have been muted", reason, config.color, author) });
        return message.delete();
    } catch (e) {
        return channel.send(e.toString());
    }

}
