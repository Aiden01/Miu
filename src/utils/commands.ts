import levenshteinDistance from '@extra-string/levenshtein-distance';
import { flatArray } from '.';
import ICommand from '../interfaces/ICommand';

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

export function getRecommendedCommand(
    actual: string,
    commands: ICommand[]
): string {
    const filtered = commands.filter(({ name }) => name !== actual);

    const distances = new Map();
    filtered.forEach(({ name }) => {
        distances.set(levenshteinDistance(name, actual), name);
    });

    const recommended = Math.min(...Array.from(distances.keys()));

    return distances.get(recommended);
}
