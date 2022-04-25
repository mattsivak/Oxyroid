import { start } from "./server/server";
import Discord from "discord.js";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});
