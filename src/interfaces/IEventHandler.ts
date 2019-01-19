import { Client, GuildMember, MessageReaction, User } from "discord.js";
import { Message } from "discord.js";

export default interface IEventHandler {
  onReady(bot: Client): void;
  onMessage(message: Message): void;
  onGuildMemberAdd(member: GuildMember, welcomeChannel: string): void;
  onGuildMemberRemove(member: GuildMember, welcomeChannel: string): void;
  messageReactionAdd(message: MessageReaction, user: User): void;
  messageReactionRemove(message: MessageReaction, user: User): void;
}
