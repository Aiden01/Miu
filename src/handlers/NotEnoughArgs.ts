import { Message } from "discord.js";

export default function notEnoughArgs(message: Message, expected: number, got: number) {
    message.reply(`This command requires ${expected} argument(s), got ${got}`)
        .catch(console.error);
}
