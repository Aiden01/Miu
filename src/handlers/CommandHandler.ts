import { GuildMember, Message, PermissionResolvable } from 'discord.js';
import { Bot } from '../Bot';
import { errorEmbed } from '../embed';
import ICommand from '../interfaces/ICommand';

/**
 * @description Check if the user passed enough arguments
 */
function hasEnoughArgs(command: ICommand, args: string[]): boolean {
    if (command.maxArgs && args.length > command.maxArgs) {
        return false;
    } else if (command.minArgs && args.length < command.minArgs) {
        return false;
    } else if (command.numArgs && args.length !== command.numArgs) {
        return false;
    } else {
        return true;
    }
}

/**
 * @description Check if the user has enough permissions
 */
function hasEnoughPermissions(
    expectedPerms: string[],
    member: GuildMember
): boolean {
    return expectedPerms.some(
        p => !member.hasPermission(p.toUpperCase() as PermissionResolvable)
    );
}

/**
 * @description Handles a command
 */
export function handleCommand(
    command: ICommand,
    args: string[],
    message: Message,
    client: Bot
): void {
    const { member, channel } = message;

    // check if the command is enabled in private message
    if (channel.type === 'dm' && command.notEnabledInDm) {
        channel.send({
            embed: errorEmbed(
                'This command is not enabled in private messages'
            ),
        });
    } else {
        if (!hasEnoughArgs(command, args) && client.notEnoughArgs) {
            const expected =
                command.numArgs || command.minArgs || command.maxArgs;
            client.notEnoughArgs(message, expected as number, args.length);
        } else if (
            command.permissions &&
            !hasEnoughPermissions(command.permissions, member) &&
            client.lackOfPermissionsHandler
        ) {
            client.lackOfPermissionsHandler(message, command);
        } else {
            command.handler(client, message, args).catch(console.error);
        }
    }
}
