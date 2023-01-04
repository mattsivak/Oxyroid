import color from 'colors/safe';
import { ChannelType, TextChannel } from 'discord.js';
import fs from 'fs';
import path from 'path';
import Data from './Data';
import Settings from './Settings';
import { WhatsAppAPI, Handlers, Types } from "whatsapp-api-js";

type Type = "OKAY" | "ERR" | "WARN" | "INFO" | "NOTE" | "DEB";

const { Text } = Types;
const Whatsapp = new WhatsAppAPI("EAAdVrWNI3u8BALb6ljN3fEXYfdhumE7nwYxvTeTm7KvMJZB5g3e6uvEsX5BJSdZBVmPaKs8WxEPI3lkpBoxAmLB2R0Chdw8EFzLAkR7u78MdZCsTpHC1XmAwWB7teNQgJ1Rqu9i26tCWSLA7l0GgeWB6H8JHR1zOazZA4ZBSfoSJOzR20Qg8LvHEECkEYQ1YQDh6ZCZA07uGwZDZD");
export default class Logger {
  static firstLogTime: string | null;
  static firstLogTimeToDiscord: string | null;
  static channel: TextChannel | null;
  static notLogedMessages: Array<string> = []

  static log(loggerType: string, message: string, type: Type, from: string): void {
    const loggerTypes = loggerType.split("|")

    if (loggerTypes.includes("console")) {
      this.logToConsole(message, type, from);
    }
    if (loggerTypes.includes("file")) {
      this.logToFile(message, type, from, loggerType.includes("withoutFormating"));
    }
    if (loggerTypes.includes("db")) {
      // this.logToDB(message, type, from);
    }
    if (loggerTypes.includes("discord")) {
      // this.logToDiscord(message, type, from);
    }
    if (loggerTypes.includes("whatsapp")) {
      this.logToWhatsapp(message, type, from)
    }
  }

  static logToConsole(message: string, type: Type, from: string) {
    const time = color.white("[" + new Date().toLocaleString() + "] ");
    const typeColor = type === "DEB" ? color.rainbow : type === "OKAY" ? color.green : type === "ERR" ? color.red : type === "WARN" ? color.yellow : type === "INFO" ? color.cyan : color.blue;

    console.log(`${time}${typeColor(type === "ERR" ? "ERR " : type === "DEB" ? "DEB " : type)} ${color.white(from)}: ${message}`);
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
        this.log("console|whatsapp", JSON.stringify(err), "ERR", "Logger");
      } else {
        if (type === "ERR") {
          fs.copyFile(path.join(__dirname, "..", "..", "storage", "logs", this.firstLogTime + ".txt"), path.join(__dirname, "..", "..", "storage", "logs", "errors", this.firstLogTime + ".txt"), (err) => {
            if (err) {
              this.log("console|whatsapp", JSON.stringify(err), "ERR", "Logger");
            }
          })
        }
      }
    });


  }

  static logToDB(message: string, type: Type, from: string): void {

  }

  static logToWhatsapp(message: string, type: Type, from: string): void {
    const time = new Date().toLocaleString();
    let msg = `[${time}] [${type} - ${from}]: ${message}`;

    Whatsapp.sendMessage("107635062197373", "420778725858", new Text(msg))
  }

  static logToDiscord(message: string, type: Type, from: string): void {
    const client = Data.client
    const time = new Date().toLocaleString();

    if (!client) {
      this.log("console|file|whatsapp", "No client provided", "ERR", "Logger");
      return;
    }

    if (!this.firstLogTimeToDiscord) {
      this.firstLogTimeToDiscord = new Date().toLocaleString().replace(/\//g, "-").replace(", ", "_").replace(/\:/g, "-");

      client.guilds.fetch(Settings.developerDiscordGuildId).then(guild => {
        guild.channels.create({
          type: ChannelType.GuildText,
          name: this.firstLogTimeToDiscord as string,
        }).then(channel => {
          this.channel = channel
        })
      })

    }

      if(!this.channel) {
        this.notLogedMessages.push(`[${time}] ${type} ${from}: ${message}`)
      } else if (this.channel && this.notLogedMessages.length >= 1) {
        if (this.channel.type != ChannelType.GuildText) { return } else {
          (this.channel as TextChannel).send(this.notLogedMessages.join("\n"));
          this.notLogedMessages = [];
          (this.channel as TextChannel).send(`[${time}] ${type} ${from}: ${message}`);
        }
      } else {
        if (this.channel.type != ChannelType.GuildText) { return } else {
          (this.channel as TextChannel).send(`[${time}] ${type} ${from}: ${message}`);
        }
      }
  }
}


