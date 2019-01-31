import { Message, RichEmbed } from 'discord.js';
import { Bot } from '../Bot';
import ICommand from '../interfaces/ICommand';
import { commandHelp } from '../services/HelpService';

export default function notEnoughArgs(
    { config: { prefix } }: Bot,
    { channel }: Message,
    expected: number,
    got: number,
    command: ICommand
) {
    const embed = new RichEmbed()
        .setColor('#d32f2f')
        .setDescription(
            `Not enough arguments, expected ${expected}, got ${got}`
        );
    commandHelp(prefix, command, embed);
    channel
        .send({
            embed,
        })
        .catch(console.error);
}
