import { Message } from 'discord.js';
import { enableFeature } from '../../API/features';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    { channel, guild }: Message,
    features: string[]
): Promise<any> {
    const confirmationMessage: Message = (await channel.send(
        'Enabling features...'
    )) as Message;

    try {
        for (const feature of features) {
            await enableFeature(feature, guild.id);
        }

        confirmationMessage.edit('Features enabled :white_check_mark:');
    } catch (e) {
        return confirmationMessage.edit({ embed: errorEmbed(e.toString()) });
    }
}
