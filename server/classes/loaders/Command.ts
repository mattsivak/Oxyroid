import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, InteractionReplyOptions, EmbedBuilder } from 'discord.js';
import Logger from '../Logger';

export type CommandOptions = {
  name: string,
  description: string,
  group: string,

  run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>

  afterGen?: (builder: SlashCommandBuilder) => void

  options?: Array<{
    type: 'string' | 'integer' | 'number' | 'boolean' | 'user' | 'channel' | 'role' | 'mentionable' | 'attachment',
    name: string,
    description: string,
    required: boolean,
  }>
}

export default class Command {
  public run: (client: Client, message: Interaction) => Promise<string | EmbedBuilder | InteractionReplyOptions>;
  public builder: SlashCommandBuilder;
  public options: CommandOptions;

  constructor(commandOptions: CommandOptions) {
    this.options = commandOptions;
    const {name, description, group, options, run, afterGen} = commandOptions;
    this.builder = new SlashCommandBuilder().setName(name).setDescription(description)
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
          break

        case "user":
          this.builder.addUserOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "role":
          this.builder.addRoleOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "integer":
          this.builder.addIntegerOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "boolean":
          this.builder.addBooleanOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "channel":
          this.builder.addChannelOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "mentionable":
          this.builder.addMentionableOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break

        case "attachment":
          this.builder.addAttachmentOption(o => {
            return o.setName(option.name).setDescription(option.description).setRequired(option.required)
          })
          break
      }
    })

    if (afterGen) {
      try {
        afterGen(this.builder)
      } catch (err) {
        Logger.log("console|file|whatsapp", "An error occured while trying to run afterGen function on command " + name, "ERR", "command")
      }
    }
  }
}
