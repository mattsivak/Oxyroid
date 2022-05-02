import { Client, Interaction, MessageEmbed } from "discord.js";
import Command from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';
import GuildModel from "../database/GuildModel";
import Logger from "../classes/Logger";

export default new Command(
  new SlashCommandBuilder().setName("dump").setDescription("Dump server info"),
  async (client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";
    const guildId = message.guild.id;
    const guild = await GuildModel.findOne({ id: guildId });

    const embed = new MessageEmbed()
      .setTitle("Dump")
      .setDescription(
        JSON.stringify(guild, null, 2)
      )
      .setColor("#ff0000");

    return embed;
  }
)
