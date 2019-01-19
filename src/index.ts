import { Bot } from "./Bot";
import CmdNotFound from "./handlers/CmdNotFound";
import EventHandler from "./handlers/EventHandler";
import LackOfPermissionsHandler from "./handlers/LackOfPermissions";
import NotEnoughArgs from "./handlers/NotEnoughArgs";
import registerCommand from "./registerCommand";

const config = {
  prefix: "~~",
  linkChannelId: "530377320742125589",
  color: "#524e8c",
  welcomeChannel: "526037066715365395",
  mutedRoleId: "531157405304750090"
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
