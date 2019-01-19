import { Message } from 'discord.js';
import { Bot } from '../../Bot';
import { errorEmbed } from '../../embed';

const choices = ['rock', 'paper', 'scissors'];

function userWins(userChoice: string, botChoice: string): boolean {
    // User's choice to the left and bot's choice to the right
    switch (`${userChoice}, ${botChoice}`) {
        case 'rock, paper':
            return false;
        case 'paper, rock':
            return true;
        case 'rock, scissors':
            return true;
        case 'scissors, rock':
            return false;
        case 'scissors, paper':
            return true;
        case 'paper, scissors':
            return false;
        default:
            return false;
    }
}

export default function run(
    _: Bot,
    { channel }: Message,
    [choice]: string[]
): Promise<any> {
    choice = choice.toLowerCase();
    if (!choices.includes(choice)) {
        return channel.send({
            embed: errorEmbed(
                `I don't know what is ${choice}, choose between ${choices.join()}`
            ),
        });
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    if (botChoice === choice) {
        return channel.send("It's equal! Do you want to play again?");
    }

    if (userWins(choice, botChoice)) {
        return channel.send(`You won! I chose ${botChoice} :smiley:`);
    } else {
        return channel.send(`You have lost, I chose ${botChoice} :frowning:`);
    }
}
