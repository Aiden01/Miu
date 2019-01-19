import { flatArray } from ".";
import ICommand from "../interfaces/ICommand";

export function parseMessage(content: string, prefix: string): string[] {
  const withoutPrefix = content.slice(prefix.length);
  return withoutPrefix.split(/ +/);
}

export function getCommand(
  modules: Map<string, ICommand[]>,
  commandName: string
): ICommand {
  return flatArray([...modules.values()]).find(
    cmd => cmd.name === commandName.toLowerCase()
  );
}
