import { Message, MessageReaction, User } from 'discord.js';
import { search } from '../../API/books';
import { Bot } from '../../Bot';
import { bookInfo, booksResult, errorEmbed } from '../../embed';
import IBook from '../../interfaces/IBook';
import { booksReactionEmojis, numberToEmoji } from '../../utils';

async function addReactions(message: Message, books: IBook[]) {
    for (const { id } of books) {
        await message.react(numberToEmoji(id));
    }
}

export default async function run(
    { config: { color } }: Bot,
    { channel, author }: Message,
    [...rest]: string[]
): Promise<any> {
    const query = rest.join(' ');
    try {
        const results = await search(query);
        if (results.length < 1) {
            return channel.send(`No result for ${query}`);
        } else {
            const message = (await channel.send({
                embed: booksResult(color, results.slice(0, 9)),
            })) as Message;
            addReactions(message as Message, results);
            const filter = ({ emoji }: MessageReaction, user: User) =>
                booksReactionEmojis.includes(emoji.id) && user.id === author.id;
            const reactions = await message.awaitReactions(filter, { max: 1 });
            const choice = reactions.first();
            const book =
                results[booksReactionEmojis.indexOf(choice.emoji.id) - 1];
            return message.edit({ embed: bookInfo(color, book) });
        }
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
