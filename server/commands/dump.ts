import { Client, Interaction, EmbedBuilder } from "discord.js";
import Command from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';
import GuildModel from "../database/GuildModel";

export default new Command(
  new SlashCommandBuilder().setName("dump").setDescription("Dump server info"),
  async (_client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";
    const guildId = message.guild.id;
    const guild = await GuildModel.findOne({ id: guildId });

    const embed = new EmbedBuilder()
      .setTitle("Dump")
      .setDescription(
        JSON.stringify(guild, null, 2)
      )
      .setColor("#ff0000");

    return embed;
  }
)
