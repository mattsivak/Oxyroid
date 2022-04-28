import { Client, Interaction, MessageEmbed } from "discord.js";
import Command from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';

export default new Command(
  new SlashCommandBuilder().setName("test").setDescription("Test command"),
  async (client, message) => {
    return { embeds: [new MessageEmbed().setTitle("Test").setDescription("Test description")] };
  }
)
