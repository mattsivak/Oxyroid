import fs from 'fs';
import path from 'path';
import Logger from './Logger';
import Settings from './Settings';
import Database from './Database';
import { Client, Interaction, MessageEmbed, MessagePayload } from 'discord.js';
import Command from './Command';
import { REST } from '@discordjs/rest';
import Data from './Data';
const { Routes } = require('discord-api-types/v9');


export default class CommandLoader {
  static Commands: Command[] = [];
  static client: Client;
  static alreadyLoaded: boolean = false;
  static rest = new REST({ version: '9' }).setToken(Settings.token);

  static async load(): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS", "console|file|discord");
      return;
    }

    if (this.alreadyLoaded) {
      Logger.log("CommandLoader: Already loaded", "WARN", "COMMANDS", "console|file|discord");
      return;
    }

    const dir = path.join(__dirname, '../commands');
    const files = fs.readdirSync(dir);

    for (const file of files) {

      if (file.endsWith('.ts')) {
        const module = await import(path.join(dir, file))
        CommandLoader.Commands.push(module.default);
        module.default.run(CommandLoader.client);

        Logger.log(`Loaded command: ${file}`, "INFO", "COMMANDS", "console|file|discord");
      }
    }

    this.alreadyLoaded = true;
  }

  static async registerCommandsOnApiOnSingleGuild(guildId: string): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS", "console|file|discord");
      return;
    }

    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(
        Routes.applicationGuildCommands(Data.clientId, guildId),
        // @ts-expect-error
        { data: dataToSend }
      )
    } catch (err) {
      Logger.log(`CommandLoader: Error while registering commands on API: ${err}`, "ERR", "COMMANDS", "console|file|discord");
    }
  }

  static async registerCommandsOnApi(): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS", "console|file|discord");
      return;
    }


    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(
        Routes.applicationCommands(Data.clientId),
        { body: dataToSend },
      );


      Logger.log('Successfully updated slash commands.', 'INFO', 'COMMANDS', "console|file|discord");
    } catch (error) {
      Logger.log(`CommandLoader: Failed to register commands on API: ${error}`, "ERR", "COMMANDS", "console|file|discord");
    }
  }

  static registerEventHandler(): void {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS", "console|file|discord");
      return;
    }

    this.client.on('interactionCreate', async (interaction) => {

      if (!interaction.isCommand()) return;

      const command = this.Commands.find(command => command.builder.name.trim() === interaction.commandName);

      if (!command) return Logger.log(`CommandLoader: Command not found: ${interaction.commandName}`, "ERR", "COMMANDS", "console|file|discord");
      try {
        command.run(this.client, interaction).then((output) => {
          if (typeof output === 'string') {
            const embed = new MessageEmbed().setTitle(output).setFooter(`Command executed by ${interaction.user.tag}`);
            interaction.reply({ embeds: [embed] });
          } else if (output instanceof MessageEmbed) {
            output.setFooter(`Command executed by ${interaction.user.tag}`);
            interaction.reply({
              embeds: [output]
            });
          } else {
            if (output.embeds) {
              for (const embed of output.embeds) {
                if (embed instanceof MessageEmbed) {
                  embed.setFooter(`Command executed by ${interaction.user.tag}`);
                }
              }
            }
            interaction.reply(output);
          }
        });
      } catch (err) {
        interaction.reply("Some error occured. Please try again later.")
        Logger.log(`CommandLoader: Error while executing command ${interaction.commandName}: ${err}`, "ERR", "COMMANDS", "console|file|discord");
      }
    });
  }
}
