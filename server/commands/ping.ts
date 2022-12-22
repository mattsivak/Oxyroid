import { Client, Interaction, EmbedBuilder } from "discord.js";
import Command from "../classes/loaders/Command";
import ping from "ping";
import Settings from "../classes/Settings"
export default new Command(
  {
    name: "ping",
    description: "Shows bot's ping",
    group: "fun",

    // functions
    run:  async (client: Client, message: Interaction) => {
      if (!message) return "Some error occured"
      if (!message.guild) return "Some error occured";
  
      const resultOfPing = await ping.promise.probe("mongodb.com");
  
      const embed = new EmbedBuilder()
        .setTitle("Ping")
        .setDescription(
          `API Latency: ${client.ws.ping}ms\n` +
          `DB Latency: ${Math.floor(parseFloat(resultOfPing.min))}ms`
        )
        .setColor(Settings.successColor);
  
      return embed;
    }
  }
)
