import { Bot } from './Bot';
import CmdNotFound from './handlers/CmdNotFound';
import EventHandler from './handlers/EventHandler';
import LackOfPermissionsHandler from './handlers/LackOfPermissions';
import NotEnoughArgs from './handlers/NotEnoughArgs';
import registerCommand from './registerCommands';

const config = {
    color: '#29B6F6',
    ownerId: '337364150080503809',
    prefix: '~~',
    quoteApiEndpoint: 'http://quotes.rest/qod.json',
    reportsChannelId: '538031454857330698',
    supportServerId: '538029353334734858',
};

const bot: Bot = new Bot()
    .eventHandler(EventHandler)
    .setConfig(config)
    .lackOfPermissions(LackOfPermissionsHandler)
    .onNotEnoughArgs(NotEnoughArgs)
    .onCommandNotFound(CmdNotFound)
    .enableHelp(true);

// commands
registerCommand(bot);

bot.login(process.env.BOT_TOKEN);
