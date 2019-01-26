import { Client, Guild, Message, PermissionResolvable } from 'discord.js';
import { handleCommand, handleSimpleCommand } from './handlers/CommandHandler';
import ICommand from './interfaces/ICommand';
import IConfig from './interfaces/IConfig';
import ISimpleCommand from './interfaces/ISimpleCommand';
import helpService from './services/HelpService';
import { flatArray } from './utils';
import { getCommand, getSimpleCommand, parseMessage } from './utils/commands';

export class Bot extends Client {
    public config: IConfig = {
        color: '',
        ownerId: '',
        prefix: '~~',
        quoteApiEndpoint: '',
        reportsChannelId: '',
        supportServerId: '',
    };
    public modules: Map<string, ICommand[]> = new Map();
    public simpleCommands: ISimpleCommand[] = [];
    public notEnoughArgs?: (
        message: Message,
        expected: number,
        got: number,
        command: ICommand
    ) => void;
    public lackOfPermissionsHandler?: (
        message: Message,
        command: ICommand
    ) => void;
    private cmdNotFoundHandler?: (
        message: Message,
        command: string,
        commands: ICommand[]
    ) => void;
    private helpEnabled: boolean = false;

    /**
     * @description Sets the event handler
     */
    public eventHandler(Handler: any): Bot {
        this.on('ready', () => {
            Handler.onReady(this);
        });

        this.on('message', (message: Message) => {
            this.handleMessage(message);
            Handler.onMessage(message);
        });

        this.on('guildCreate', (guild: Guild) => {
            Handler.guildCreate(guild).catch(console.error);
        });

        return this;
    }

    /**
     * @description Sets the config object
     */
    public setConfig(confObject: IConfig): Bot {
        this.config = confObject;
        return this;
    }

    public module(moduleName: string, commands: () => ICommand[]): Bot {
        this.modules.set(moduleName, commands());
        return this;
    }

    /**
     * @description Fired when the command is not found
     */
    public onCommandNotFound(
        handler: (
            message: Message,
            command: string,
            commands: ICommand[]
        ) => void
    ): Bot {
        this.cmdNotFoundHandler = handler;
        return this;
    }

    public registerSimpleCommands(simpleCommands: ISimpleCommand[]): Bot {
        this.simpleCommands = simpleCommands;
        return this;
    }

    public onNotEnoughArgs(
        handler: (
            message: Message,
            expected: number,
            got: number,
            command: ICommand
        ) => void
    ): Bot {
        this.notEnoughArgs = handler;
        return this;
    }

    public enableHelp(isEnabled: boolean): Bot {
        this.helpEnabled = isEnabled;
        return this;
    }

    public lackOfPermissions(
        fn: (message: Message, command: ICommand) => void
    ): Bot {
        this.lackOfPermissionsHandler = fn;
        return this;
    }

    /**
     * @description Handles the new incomming message
     */
    private handleMessage(message: Message) {
        const { content, author } = message;

        if (author.bot) {
            return;
        }

        if (!content.startsWith(this.config.prefix)) {
            return;
        }

        const [commandName, ...args] = parseMessage(
            content,
            this.config.prefix
        );

        const command = getCommand(this.modules, commandName);
        if (commandName === 'help' && this.helpEnabled) {
            helpService(
                this.modules,
                this.simpleCommands,
                message,
                this.config,
                args
            ).catch(console.error);
        } else {
            if (command) {
                handleCommand(command, args, message, this);
            } else {
                const simpleCommand = getSimpleCommand(
                    commandName,
                    this.simpleCommands
                );
                if (simpleCommand) {
                    handleSimpleCommand(message, simpleCommand).catch(
                        console.error
                    );
                } else {
                    if (this.cmdNotFoundHandler) {
                        this.cmdNotFoundHandler(
                            message,
                            commandName,
                            flatArray([
                                ...this.modules.values(),
                                this.simpleCommands,
                            ])
                        );
                    }
                }
            }
        }
    }
}
