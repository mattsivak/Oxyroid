import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, InteractionReplyOptions, MessageEmbed, MessagePayload } from 'discord.js';

export default class Command {
  run: (client: Client, message: Interaction) => Promise<string | MessageEmbed | InteractionReplyOptions>;
  builder: SlashCommandBuilder;

  constructor(builder: SlashCommandBuilder, run: (client: Client, message: Interaction) => Promise<string | MessageEmbed | InteractionReplyOptions>) {
    this.builder = builder;
    this.run = run;
  }
}
