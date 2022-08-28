import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, InteractionReplyOptions, EmbedBuilder } from 'discord.js';

export default class Command {
  run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>;
  builder: SlashCommandBuilder;

  constructor(builder: SlashCommandBuilder, run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>) {
    this.builder = builder;
    this.run = run;
  }
}
