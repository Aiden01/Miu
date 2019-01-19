import { Message } from 'discord.js';
import { enableOrDisableFeature } from '../../API/features';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

export default async function run(
    _: Bot,
    { channel, guild }: Message,
    features: string[]
): Promise<any> {
    const confirmationMessage: Message = (await channel.send(
        'Disabling features...'
    )) as Message;

    try {
        for (const feature of features) {
            await enableOrDisableFeature(feature, guild.id, false);
        }

        confirmationMessage.edit('Features disabled :white_check_mark:');
    } catch (e) {
        return confirmationMessage.edit({ embed: errorEmbed(e.toString()) });
    }
}
