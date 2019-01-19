import { Message } from "discord.js";
import { errorEmbed } from "../embed";
import ICommand from "../interfaces/ICommand";

export default function lackOfPermissions({ channel }: Message, _: ICommand) {
  channel
    .send({
      embed: errorEmbed("You don't have the required roles to use this command")
    })
    .catch(console.error);
}
