import { Message, RichEmbed } from 'discord.js';
import { Bot } from '../Bot';
import ICommand from '../interfaces/ICommand';
import IConfig from '../interfaces/IConfig';
import { getCommand } from '../utils/commands';

export default function runService(
    { modules, simpleCommands, config: { prefix } }: Bot,
    { channel }: Message,
    config: IConfig,
    [query]: string[]
): Promise<any> {
    const helpEmbed = new RichEmbed()
        .setColor(config.color)
        .setTimestamp(new Date());
    if (query) {
        const module = modules.get(query);
        if (!module) {
            const command = getCommand(modules, query);
            if (!command) {
                return channel.send(`Module or command ${query} not found`);
            } else {
                commandHelp(prefix, command, helpEmbed);
            }
        } else {
            moduleHelp(module, query, helpEmbed);
        }
    } else {
        helpEmbed.setTitle('All available modules');
        helpEmbed.setDescription(
            'Type ``~~help <module>`` to get more information about a module or a command ``~~help <command>``'
        );
        for (const [name, commands] of modules.entries()) {
            helpEmbed.addField(name, commands.map(cmd => cmd.name).join(', '));
        }
        helpEmbed.addField(
            'other (not a module)',
            simpleCommands.map(({ name }) => name).join(', ')
        );
    }

    return channel.send({ embed: helpEmbed });
}

/**
 * Returns help embed for a module
 */
function moduleHelp(module: ICommand[], moduleName: string, embed: RichEmbed) {
    embed.setTitle(`All available commands in module ${moduleName}`);
    for (const { name, description, argsName } of module) {
        const args = argsName ? ' - ' + argsName.join(', ') : '';
        embed.addField(`${name} ${args}`, description, false);
    }
}

/**
 * Returns help embed for a command
 */
export function commandHelp(
    prefix: string,
    command: ICommand,
    embed: RichEmbed
) {
    const {
        name,
        description,
        permissions,
        argsName,
        aliases,
        example,
    } = command;
    embed
        .setTitle(`Command ${name}`)
        .addField('Description', description)
        .addField('Aliases', aliases.length < 1 ? 'None' : aliases.join(', '))
        .addField('Example', example ? prefix + example : 'None')
        .addField(
            'Required permissions',
            permissions ? permissions.join(', ') : 'None'
        )
        .addField('Arguments', argsName ? argsName.join(', ') : 'None');
}
