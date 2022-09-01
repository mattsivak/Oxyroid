import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, InteractionReplyOptions, EmbedBuilder } from 'discord.js';

export default class Command {
  run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>;
  builder: SlashCommandBuilder;

  constructor(builder: SlashCommandBuilder, run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>, options?: Array<{
    type: 'string' | 'integer' | 'number' | 'boolean' | 'user' | 'channel' | 'role' | 'mentionable' | 'attachment',
    name: string,
    description: string,
    required: boolean,
}>) {
    this.builder = builder
    this.run = run
  
    options?.forEach(option => {
      switch (option.type) {
        case "string": 
          this.builder.addStringOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
        break

        case "number": 
          this.builder.addNumberOption(o => {
          return o.setName(option.name).setDescription(option.description).setRequired(option.required)
        })
      }
    }) 
  }
}
