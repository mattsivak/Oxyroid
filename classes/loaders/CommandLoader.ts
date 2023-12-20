import fs from 'fs';
import path, { join } from 'path';
import Logger from './../Logger';
import Settings from './../Settings';
import { Client, EmbedBuilder } from 'discord.js';
import Command from './Command';
import { REST } from '@discordjs/rest';
import Data from './../Data';
import { Routes } from 'discord-api-types/v9';

export default class CommandLoader {
  static Commands: Command[] = [];
  static client: Client;
  static alreadyLoaded: boolean = false;
  static rest = new REST({ version: '9' }).setToken(Settings.token);

  // Load commands
  static async load(directory?: string): Promise<void> {
    if (!this.client) {
      Logger.log('No client provided', 'ERR', 'COMMANDS');
      return;
    }

    if (this.alreadyLoaded) {
      Logger.log('Already loaded', 'WARN', 'COMMANDS');
      return;
    }

    const dir = path.join(__dirname, directory || '../../commands');
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (file.endsWith('.ts')) {
        const module = await import(path.join(dir, file)).catch(err => {
          Logger.log(
            `Failed loading of command: ${file} due to ` + err,
            'ERR',
            'COMMANDS'
          );
        });
        CommandLoader.Commands.push(module.default);

        Logger.log(`Loaded command: ${file}`, 'INFO', 'COMMANDS');
      } else {
        const status = fs.statSync(join(dir, file));
        if (status.isDirectory()) {
          await this.load(join(directory || '../../commands', file));
        }
      }
    }

    this.alreadyLoaded = true;
  }

  // Register commands on single guild
  static async registerCommandsOnApiOnSingleGuild(
    guildId: string
  ): Promise<void> {
    if (!this.client) {
      Logger.log('No client provided', 'ERR', 'COMMANDS');
      return;
    }

    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(
        Routes.applicationGuildCommands(Data.clientId, guildId),
        // @ts-expect-error
        { data: dataToSend }
      );
    } catch (err) {
      Logger.log(
        `Error while registering commands on API: ${err}`,
        'ERR',
        'COMMANDS'
      );
    }
  }

  // Register commands on all guilds
  static async registerCommandsOnApi(): Promise<void> {
    if (!this.client) {
      Logger.log('No client provided', 'ERR', 'COMMANDS');
      return;
    }

    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(Routes.applicationCommands(Data.clientId), {
        body: dataToSend
      });

      Logger.log('Successfully updated slash commands.', 'INFO', 'COMMANDS');
    } catch (error) {
      Logger.log(
        `Failed to register commands on API: ${error}`,
        'ERR',
        'COMMANDS'
      );
    }
  }

  // Register event handler
  static async registerEventHandler(): Promise<void> {
    if (!this.client) {
      Logger.log('No client provided', 'ERR', 'COMMANDS');
      return;
    }

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      const command = this.Commands.find(
        command => command.builder.name.trim() === interaction.commandName
      );

      if (!command)
        return Logger.log(
          `Command not found: ${interaction.commandName}`,
          'ERR',
          'COMMANDS'
        );
      try {
        if (Settings.devMode) {
          Logger.log(
            `Command used: ${command.builder.name}`,
            'DEB',
            'COMMANDS'
          );
        }
        command.run(this.client, interaction).then(output => {
          if (output === false) return;
          if (typeof output === 'string') {
            const embed = new EmbedBuilder().setTitle(output).setFooter({
              text: `Command executed by ${interaction.user.tag}`
            });
            interaction.reply({ embeds: [embed] });
          } else if (output instanceof EmbedBuilder) {
            output.setFooter({
              text: `Command executed by ${interaction.user.tag}`
            });
            interaction.reply({
              embeds: [output]
            });
          } else {
            if (output.embeds) {
              for (const embed of output.embeds) {
                if (embed instanceof EmbedBuilder) {
                  embed.setFooter({
                    text: `Command executed by ${interaction.user.tag}`
                  });
                }
              }
            }
            interaction.reply(output);
          }
        });
      } catch (err) {
        interaction.reply('Some error occured. Please try again later.');
        Logger.log(
          `Error while executing command ${interaction.commandName}: ${err}`,
          'ERR',
          'COMMANDS'
        );
      }
    });
  }
}
