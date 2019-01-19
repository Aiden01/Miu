import { Message } from 'discord.js';
import { badWordsFeatureEnable } from '../../API/badWords';
import { Bot } from '../../Bot';
import { serverInfo } from '../../embed';

export default async function run(
    { config }: Bot,
    { channel, guild }: Message,
    _: string[]
): Promise<any> {
    const badWordsOn = await badWordsFeatureEnable(guild.id);

    return channel.send({
        embed: serverInfo(guild, config.color, badWordsOn),
    });
}
