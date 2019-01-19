import { Message } from 'discord.js'
import { errorEmbed } from '../embed'

export default function notEnoughArgs(
    { channel }: Message,
    expected: number,
    got: number
) {
    channel
        .send({
            embed: errorEmbed(
                `This command requires ${expected} argument(s), got ${got}`
            ),
        })
        .catch(console.error)
}
