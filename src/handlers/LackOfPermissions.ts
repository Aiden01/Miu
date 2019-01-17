import { Message } from "discord.js";
import ICommand from "../interfaces/ICommand";

export default function lackOfPermissions(message: Message, _: ICommand) {
    message.reply("You don't have the required roles to use this command")
        .catch(console.error);
}
