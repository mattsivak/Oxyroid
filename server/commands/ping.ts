import { Client, Interaction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../classes/Command";
import Database from "../classes/Database";
import ping from "ping";

export default new Command(
  new SlashCommandBuilder().setName("ping").setDescription("Messure the latency, API latency and DB latency"),
  async (client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";

    const DB = new Database();

    const resultOfPing = await ping.promise.probe("mongodb.com");

    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .setDescription(
        `API Latency: ${client.ws.ping}ms\n` +
        `DB Latency: ${Math.floor(parseFloat(resultOfPing.min))}ms`
      )
      .setColor("#ff0000");

    return embed;
  }
)
