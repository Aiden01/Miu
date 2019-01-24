import { GuildChannel, Message, TextChannel } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed, issueEmbed } from '../../embed';

export default async function run(
    { config: { reportsChannelId, supportServerId, color }, guilds }: Bot,
    { channel, guild, author }: Message,
    [...rest]: string[]
): Promise<any> {
    const issue = rest.join(' ');
    const supportServer = guilds.get(supportServerId);
    const embed = errorEmbed('An unknown error has occurred');
    if (!supportServer) {
        return channel.send({ embed });
    } else {
        const reportsChannel = supportServer.channels.get(
            reportsChannelId
        ) as TextChannel;
        if (!reportsChannel) {
            return channel.send({ embed });
        } else {
            const invite = await (channel as GuildChannel)
                .createInvite()
                .catch(console.error);
            try {
                await reportsChannel.send({
                    embed: issueEmbed(
                        issue,
                        author,
                        invite ? invite.url : 'Unavailable',
                        color
                    ),
                });
                return channel.send(
                    'Your issue has been reported, we will get back to you as soon as possible.'
                );
            } catch (e) {
                return channel.send({ embed: errorEmbed(e.toString()) });
            }
        }
    }
}
