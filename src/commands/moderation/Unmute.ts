import { GuildMember, Message } from "discord.js";
import { Bot } from "../../Bot";
import { unmuteConfirmation } from "../../embed";
import { alreadyMuted, getRole, isAdmin } from "../../utils";

export default async function run({ config }: Bot, message: Message, _: string[]): Promise<any> {
    const { member, mentions, guild, channel, author } = message;
    if (mentions.users.array().length < 1) { return channel.send("Invalid user"); }


    const toMute: GuildMember = guild.member(mentions.users.first());
    if (isAdmin(toMute) || toMute === member || !alreadyMuted(toMute)) {
        return channel.send("Cannot unmute this user, because he is not muted or he is a moderator.");
    }

    try {
        const role = await getRole(guild, "muted");
        await toMute.removeRole(role);
        await channel.send(`<@${toMute.id}> has been unmuted`);
        await toMute.send({ embed: unmuteConfirmation(config.color, author) });
        return message.delete();
    } catch (e) {
        return channel.send(e.toString());
    }

}
