import Discord from "discord.js";
import Settings from "./classes/Settings";
import Logger from "./classes/Logger";
import Database from "./classes/Database";
import color from "colors/safe"
import FeaturesLoader from "./classes/FeaturesLoader";
import CommandLoader from "./classes/CommandLoader";
import Data from "./classes/Data";
import startServer from "./server/server";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});

Data.client = client;

client.on("ready", async () => {
  Logger.log(`Logged in as ${client.user?.tag}`, "INFO", "CLIENT", "console|file|discord");
  Data.clientId = client.user?.id || "";
  FeaturesLoader.client = client;
  CommandLoader.client = client;

  startServer();

  FeaturesLoader.load();

  await CommandLoader.load();
  await CommandLoader.registerCommandsOnApi();
  CommandLoader.registerEventHandler();

  new Database();
})

client.login(Settings.token);

process.stdin.resume();

let alreadyEded = false;

const date = new Date();
const dateString = date.toLocaleString();

Logger.log(`|\n|\n| Starting procces. Date and time is ${dateString}\n|\n|`, "INFO", "PROCESS", "file|withoutFormating");
Logger.log(`Starting procces. Date and time is ${dateString}`, "INFO", "PROCESS", "discord");

function exitHandler(reason: any, promise: any) {
  if (alreadyEded) return;
  Logger.log(`Exiting with reason: ${JSON.stringify(reason)}`, "INFO", "PROCESS", "console|file|discord");
  setTimeout(() => {
    alreadyEded = true;
    process.exit(0);
  }, 500);
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
