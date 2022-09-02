import Discord, { GatewayIntentBits, Partials } from "discord.js";
import Settings from "./classes/Settings";
import Logger from "./classes/Logger";
import Database from "./classes/Database";
import FeaturesLoader from "./classes/loaders/FeaturesLoader";
import CommandLoader from "./classes/loaders/CommandLoader";
import Data from "./classes/Data";
import startServer from "./express";

const client = new Discord.Client({
  partials: [Partials.Message, Partials.Channel, Partials.Channel],
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
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
  await CommandLoader.registerEventHandler();

  new Database();
})

client.login(Settings.token);

// process.stdin.resume();

let alreadyEded = false;

const date = new Date();
const dateString = date.toLocaleString();

Logger.log(`| Starting procces. Date and time is ${dateString}\n|\n|`, "INFO", "PROCESS", "file|withoutFormating");
Logger.log(`Starting procces. Date and time is ${dateString}`, "INFO", "PROCESS", "console");

function exitHandler(reason: any) {
  if (alreadyEded) return;
  alreadyEded = true;
  Logger.log(`Exiting with reason: ${JSON.stringify(reason)}`, "INFO", "PROCESS", "console|file|discord");
  setTimeout(() => {
    process.exit(0);
  }, 500);
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, "exit"));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, "SIGINT"));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, "SIGUSR1"));
process.on('SIGUSR2', exitHandler.bind(null, "SIGUSR2"));
