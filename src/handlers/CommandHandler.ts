import { GuildMember, Message, PermissionResolvable } from 'discord.js';
import { Bot } from '../Bot';
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
    const { member } = message;
    if (!hasEnoughArgs(command, args) && client.notEnoughArgs) {
        const expected = command.numArgs || command.minArgs || command.maxArgs;
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
