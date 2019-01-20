import { Guild, TextChannel } from 'discord.js';
import { logEmbed } from '../embed';
import { fetchApi } from './MiuApi';

export async function logsFeatureEnabled(serverId: string): Promise<boolean> {
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${serverId}"}}) {
            logson
        }
    }`);
    return server.logson;
}

export async function log(
    title: string,
    color: string,
    { id, channels }: Guild,
    customFields: any
): Promise<any> {
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${id}"}}) {
            logson
            logs_channel
        }
    }`);

    if (!server.logson) {
        return;
    } else {
        const logsChannel = channels.get(server.logs_channel) as TextChannel;
        if (!logsChannel) {
            return;
        }
        return logsChannel
            .send({ embed: logEmbed(title, color, customFields) })
            .catch(console.error);
    }
}
