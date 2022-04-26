import { start } from "./server/server";
import Discord from "discord.js";
import Settings from "./classes/Settings";
import Logger from "./classes/Logger";
import Database from "./classes/Database";
import color from "colors/safe"
import FeaturesLoader from "./classes/FeaturesLoader";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});

client.on("ready", () => {
  Logger.log(`Logged in as ${color.bold(color.underline(client.user?.tag || "NONE"))}`, "INFO", "CLIENT");
  FeaturesLoader.client = client;
  FeaturesLoader.load();
  new Database();
  start()
})

client.login(Settings.token);
