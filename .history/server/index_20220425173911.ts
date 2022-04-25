import { start } from "./server/server";
import Discord from "discord.js";
import Settings from "./classes/Settings";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});


client.login(Settings.token);
