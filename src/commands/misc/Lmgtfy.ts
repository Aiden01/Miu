import { Message } from "discord.js";
import { Bot } from "../../Bot";

export default function run(
  _: Bot,
  { channel }: Message,
  [...args]: string[]
): Promise<Message> {
  const query = encodeURI(args.join(" "));
  return channel.send(`http://lmgtfy.com/?q=${query}`) as Promise<Message>;
}
