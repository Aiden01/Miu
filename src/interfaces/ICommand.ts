import { Message } from 'discord.js';
import { Bot } from '../Bot';

export default interface ICommand {
    name: string;
    description?: string;
    minArgs?: number;
    maxArgs?: number;
    numArgs?: number;
    argsName?: string[];
    permissions?: string[];
    notEnabledInDm?: boolean;
    aliases: string[];
    handler: (ctx: Bot, message: Message, args: string[]) => Promise<any>;
}
