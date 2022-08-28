import color from 'colors/safe';
import { ChannelType, TextChannel } from 'discord.js';
import fs from 'fs';
import path from 'path';
import Data from './Data';
import Settings from './Settings';

type Type = "OKAY" | "ERR" | "WARN" | "INFO" | "NOTE";

export default class Logger {
  static firstLogTime: string | null;

  static log(message: string, type: Type, from: string, loggerType: string): void {
    if (loggerType.includes("console")) {
      this.logToConsole(message, type, from);
    }
    if (loggerType.includes("file")) {
      this.logToFile(message, type, from, loggerType.includes("withoutFormating"));
    }
    if (loggerType.includes("db")) {
      this.logToDB(message, type, from);
    }
    if (loggerType.includes("discord")) {
      this.logToDiscord(message, type, from);
    }
  }

  static logToConsole(message: string, type: Type, from: string) {
    const time = color.white("[" + new Date().toLocaleString() + "] ");
    const typeColor = type === "OKAY" ? color.green : type === "ERR" ? color.red : type === "WARN" ? color.yellow : type === "INFO" ? color.cyan : color.blue;

    console.log(`${time}${typeColor(type === "ERR" ? "ERR " : type)} ${color.white(from)}: ${message}`);
  }

  static logToFile(message: string, type: Type, from: string, withoutFormating: boolean): void {
    const time = new Date().toLocaleString();
    let msg = `[${time}] [${type} - ${from}]: ${message}`;

    if (withoutFormating) {
      msg = message;
    }

    if (!this.firstLogTime) {
      this.firstLogTime = new Date().toLocaleString().replace(/\//g, "-").replace(", ", " | ");
    }

    // Check if logs folder exists and create it if not
    if (!fs.existsSync(path.join(__dirname, "..", "..", "storage", "logs"))) {
      fs.mkdirSync(path.join(__dirname, "..", "..", "storage", "logs"));
    }

    fs.appendFile(path.join(__dirname, "..", "..", "storage", "logs", this.firstLogTime + ".txt"), msg + "\n", (err) => {
      if (err) {
        this.log(JSON.stringify(err), "ERR", "Logger", "console");
      }
    });
  }

  static logToDB(message: string, type: Type, from: string): void {

  }

  static logToDiscord(message: string, type: Type, from: string): void {
    const client = Data.client
    if (!client) {
      this.log("No client provided", "ERR", "Logger", "console|file");
      return;
    }

    client.channels.fetch(Settings.logsDiscordChannelId).then((channel) => {
      if (!channel) return;
      if (channel.type != ChannelType.GuildText) { return } else {
        (channel as TextChannel).send(`[${type}] ${from}: ${message}`);
      }
    }).catch((err) => {
      this.log(JSON.stringify(err), "ERR", "Logger", "console|file");
    });
  }
}
