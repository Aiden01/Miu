import { Message } from "discord.js";
import { Bot } from "../../Bot";
import { serverInfo } from "../../embed";

export default function run(
  { config }: Bot,
  { channel, guild }: Message,
  _: string[]
): Promise<Message> {
  return channel.send({ embed: serverInfo(guild, config.color) }) as Promise<
    Message
  >;
}
