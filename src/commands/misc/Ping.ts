import { Message } from "discord.js";
import { Bot } from "../../Bot";

export default function run(
  ctx: Bot,
  { channel }: Message,
  _: string[]
): Promise<Message> {
  return channel.send(`${ctx.ping}ms`) as Promise<Message>;
}
