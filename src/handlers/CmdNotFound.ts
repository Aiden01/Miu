import { Message } from "discord.js";

export default function cmdNotFound({ channel }: Message) {
  channel.send(`Command not found`).catch(console.error);
}
