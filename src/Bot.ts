import { Client, Guild, Message, PermissionResolvable } from 'discord.js';
import ICommand from './interfaces/ICommand';
import IConfig from './interfaces/IConfig';
import helpService from './services/HelpService';
import { getCommand, parseMessage } from './utils/commands';

export class Bot extends Client {
    public config: IConfig = {
        color: '',
        ownerId: '',
        prefix: '~~',
        quoteApiEndpoint: '',
    };
    public modules: Map<string, ICommand[]> = new Map();
    private cmdNotFoundHandler?: (message: Message) => void;
    private notEnoughArgs?: (
        message: Message,
        expected: number,
        got: number
    ) => void;
    private lackOfPermissionsHandler?: (
        message: Message,
        command: ICommand
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
    public onCommandNotFound(handler: (message: Message) => void): Bot {
        this.cmdNotFoundHandler = handler;
        return this;
    }

    public onNotEnoughArgs(
        handler: (message: Message, expected: number, got: number) => void
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
            helpService(this.modules, message, this.config, args).catch(
                console.error
            );
        } else {
            if (command) {
                this.handleCommand(command, args, message);
            } else {
                if (this.cmdNotFoundHandler) {
                    this.cmdNotFoundHandler(message);
                }
            }
        }
    }

    /**
     * @description Handles a new command
     */
    private handleCommand(
        command: ICommand,
        args: string[],
        message: Message
    ): void {
        // Checks if the arguments are correctly passed
        if (command.maxArgs && args.length > command.maxArgs) {
            if (this.notEnoughArgs) {
                this.notEnoughArgs(message, command.maxArgs, args.length);
            }
        } else if (command.minArgs && args.length < command.minArgs) {
            if (this.notEnoughArgs) {
                this.notEnoughArgs(message, command.minArgs, args.length);
            }
        } else if (command.numArgs && args.length !== command.numArgs) {
            if (this.notEnoughArgs) {
                this.notEnoughArgs(message, command.numArgs, args.length);
            }
        } else {
            if (command.permissions) {
                for (const permission of command.permissions) {
                    if (
                        !message.member.hasPermission(
                            permission.toUpperCase() as PermissionResolvable
                        )
                    ) {
                        if (this.lackOfPermissionsHandler) {
                            this.lackOfPermissionsHandler(message, command);
                        }
                    } else {
                        command
                            .handler(this, message, args)
                            .catch(console.error);
                    }
                }
            } else {
                command.handler(this, message, args).catch(console.error);
            }
        }
    }
}
