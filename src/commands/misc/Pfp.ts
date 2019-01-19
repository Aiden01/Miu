import { Message } from "discord.js";
import { Bot } from "../../Bot";
import { errorEmbed, pfpEmbed } from "../../embed";

export default function run(
  { config }: Bot,
  { mentions, channel }: Message,
  _: string[]
): Promise<Message> {
  if (mentions.users.size < 1) {
    return channel.send({ embed: errorEmbed("Invalid user") }) as Promise<
      Message
    >;
  }
  const target = mentions.users.first();
  if (!target) {
    return channel.send({ embed: errorEmbed("Invalid user") }) as Promise<
      Message
    >;
  } else {
    return channel.send({ embed: pfpEmbed(target, config.color) }) as Promise<
      Message
    >;
  }
}
