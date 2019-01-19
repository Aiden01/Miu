import { Message } from "discord.js";
import { Bot } from "../../Bot";

export default async function run(_: Bot, msg: Message, [, ...nickname]: string[]): Promise<any> {
    const { mentions, channel, guild } = msg;
    if (mentions.users.array().length < 1) { return channel.send("Invalid user"); }
    const target = guild.member(mentions.users.first());
    try {
        await target.setNickname(nickname.join(" "));
        await channel.send(`<@${target.id}> has been renamed`);
        return await msg.delete();
    } catch (e) {
        return channel.send(e.toString());
    }
}
