import axios from 'axios';
import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    { config: { quoteApiEndpoint } }: Bot,
    { channel }: Message,
    _: string[]
): Promise<any> {
    try {
        const {
            data: {
                contents: {
                    quotes: [quote],
                },
            },
        } = await axios.get(quoteApiEndpoint);
        return channel.send(`« ${quote.quote} » \n- ${quote.author}`);
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
