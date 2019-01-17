
import { Message, RichEmbed } from "discord.js";
import ICommand from "../interfaces/ICommand";
import IConfig from "../interfaces/IConfig";

export default function runService(modules: Map<string, ICommand[]>, { channel }: Message, config: IConfig, [moduleName]: string[]): Promise<Message, Message[]> {
    const helpEmbed = new RichEmbed()
        .setColor(config.color)
        .setTimestamp(new Date());
    if (moduleName) {
            const module = modules.get(moduleName);
            if (!module) { return channel.send(`Module ${moduleName} not found`); }
            helpEmbed.setDescription(`All available commands in module ${moduleName}`);
            for (const { name, description, argsName } of module) {
                const args = argsName ? " - " + argsName.join(", ") : "";
                helpEmbed.addField(`${name} ${args}`, description);
            }
    } else {
        for (const [name, commands] of modules.entries()) {
            helpEmbed.addField(name, commands.map((cmd) => cmd.name).join(", "), false);
        }
    }

    return channel.send({ embed: helpEmbed });

}
