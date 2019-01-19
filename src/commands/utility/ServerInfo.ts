import { Message } from 'discord.js';
import { fetchApi } from '../../API/MiuApi';
import { Bot } from '../../Bot';
import { serverInfo } from '../../embed';

export default async function run(
    { config }: Bot,
    { channel, guild }: Message,
    _: string[]
): Promise<any> {
    // Get information about the server with the API
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${guild.id}"}}) {
            badWordsOn
        }
    }`);

    return channel.send({
        embed: serverInfo(guild, config.color, server.badWordsOn),
    });
}
