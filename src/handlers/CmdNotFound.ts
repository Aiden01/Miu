import { Message } from 'discord.js';
import ICommand from '../interfaces/ICommand';
import { getRecommendedCommand } from '../utils/commands';

export default function cmdNotFound(
    { channel }: Message,
    command: string,
    commands: any[]
) {
    channel
        .send(
            `Command not found, did you mean ${getRecommendedCommand(
                command,
                commands
            )}?`
        )
        .catch(console.error);
}
