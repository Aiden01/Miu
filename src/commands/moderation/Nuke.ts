import { Message } from "discord.js";
import { Bot } from "../../Bot";

export default async function run(
  _: Bot,
  msg: Message,
  [n]: string[]
): Promise<any> {
  const nb = parseInt(n, 10);
  if (Number.isNaN(nb)) {
    return msg.channel.send("Please specify the amount of messages to delete");
  }
  if (nb > 100) {
    return msg.channel.send("Cannot delete more than 100 messages");
  }

  await msg.channel.bulkDelete(nb);
  return msg.delete();
}
