import { Client, Interaction } from "discord.js";
import Command from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';

export default new Command(
  new SlashCommandBuilder().setName("test").setDescription("Test command"),
  (client, message) => {
    return "test";
  }
)
