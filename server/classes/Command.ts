import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, MessageEmbed } from 'discord.js';

export default class Command {
  run: (client: Client, message: Interaction) => string | MessageEmbed;
  builder: SlashCommandBuilder;

  constructor(builder: SlashCommandBuilder, run: (client: Client, message: Interaction) => string | MessageEmbed) {
    this.builder = builder;
    this.run = run;
  }
}
