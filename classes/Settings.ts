import { ColorResolvable } from 'discord.js';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export default class Settings {
  static token = process.env.TOKEN as string;

  static developerDiscordGuildId = '1013471462528655441';
  static evalChannelId = '1071819176567648276';

  static devMode: boolean = true;
  static db =
    'mongodb+srv://mattsivak:ss1540SS@cluster0.jic3kqq.mongodb.net/Oxyroid-dev';

  static serverPort = 4000;

  static colors = {
    success: '#7fff00' as ColorResolvable,
    error: '#ff0000' as ColorResolvable,
    warning: '#efaf00' as ColorResolvable,
    info: '#00ae86' as ColorResolvable
  }

}
// mongodb+srv://bialu:BialuJeTop@cluster0.g5vfi.mongodb.net/discord
