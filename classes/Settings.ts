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

	static successColor: ColorResolvable = '#7fff00';
	static errorColor: ColorResolvable = '#ff0000';
	static warningColor: ColorResolvable = '#efaf00';
}
// mongodb+srv://bialu:BialuJeTop@cluster0.g5vfi.mongodb.net/discord
