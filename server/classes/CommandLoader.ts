import fs from 'fs';
import path from 'path';
import Logger from './Logger';
import Settings from './Settings';
import Database from './Database';
import { Client, Interaction } from 'discord.js';
import Command from './Command';
import { REST } from '@discordjs/rest';
const { Routes } = require('discord-api-types/v9');


export default class CommandLoader {
  static Commands: Command[] = [];
  static client: Client;
  static alreadyLoaded: boolean = false;
  static rest = new REST({ version: '9' }).setToken(Settings.token);

  static async load(): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS");
      return;
    }

    if (this.alreadyLoaded) {
      Logger.log("CommandLoader: Already loaded", "WARN", "COMMANDS");
      return;
    }

    const dir = path.join(__dirname, '../commands');
    const files = fs.readdirSync(dir);

    for (const file of files) {

      if (file.endsWith('.ts')) {
        const module = await import(path.join(dir, file))
        CommandLoader.Commands.push(module.default);
        module.default.run(CommandLoader.client);

        Logger.log(`Loaded command: ${file}`, "INFO", "COMMANDS");
      }
    }

    this.alreadyLoaded = true;
  }

  static async registerCommandsOnApiOnSingleGuild(guildId: string): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS");
      return;
    }

    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(
        Routes.applicationGuildCommands("899284042925637632", guildId),
        // @ts-expect-error
        { data: dataToSend }
      )
    } catch (err) {
      Logger.log(`CommandLoader: Error while registering commands on API: ${err}`, "ERR", "COMMANDS");
    }
  }

  static async registerCommandsOnApi(): Promise<void> {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS");
      return;
    }


    try {
      const dataToSend = this.Commands.map(command => command.builder.toJSON());

      await this.rest.put(
        Routes.applicationCommands("899284042925637632"),
        { body: dataToSend },
      );


      Logger.log('Successfully updated slash commands.', 'INFO', 'COMMANDS');
    } catch (error) {
      Logger.log(`CommandLoader: Failed to register commands on API: ${error}`, "ERR", "COMMANDS");
    }
  }

  static registerEventHandler(): void {
    if (!this.client) {
      Logger.log("CommandLoader: No client provided", "ERR", "COMMANDS");
      return;
    }

    for (const command of this.Commands) {
      this.client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) return;

        return interaction.reply("test");

        // const commandName = interaction.commandName;

        // for (const command of this.Commands) {
        //   if (command.builder.name === commandName) {
        //     command.run(this.client, interaction);
        //   }
        // }
      })
    }
  }
}
