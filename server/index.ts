import { start } from "./server/server";
import Discord from "discord.js";
import Settings from "./classes/Settings";
import Logger from "./classes/Logger";
import Database from "./classes/Database";
import color from "colors/safe"
import FeaturesLoader from "./classes/FeaturesLoader";
import CommandLoader from "./classes/CommandLoader";
import Data from "./classes/Data";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});

client.on("ready", async () => {
  Logger.log(`Logged in as ${color.bold(color.underline(client.user?.tag || "NONE"))}`, "INFO", "CLIENT");
  Data.clientId = client.user?.id || "";
  FeaturesLoader.client = client;
  CommandLoader.client = client;

  FeaturesLoader.load();

  await CommandLoader.load();
  await CommandLoader.registerCommandsOnApi();
  CommandLoader.registerEventHandler();

  new Database();
  start()
})

client.login(Settings.token);
