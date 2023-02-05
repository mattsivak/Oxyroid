import color from 'colors/safe'
import { ChannelType, TextChannel } from 'discord.js'
import fs from 'fs'
import path from 'path'
import Data from './Data'
import Settings from './Settings'

type Type = 'OKAY' | 'ERR' | 'WARN' | 'INFO' | 'NOTE' | 'DEB'

export default class Logger {
	static firstLogTime: string | null
	static firstLogTimeToDiscord: string | null
	static channel: TextChannel | null
	static notLogedMessages: Array<string> = []

	static log(message: string, type: Type, from: string): void {
		if (from === 'LOGGER') {
			this.logToConsole(message, type, from)
		} else {
			this.logToConsole(message, type, from)
			this.logToFile(message, type, from)
		}
	}

	static logToConsole(message: string, type: Type, from: string) {
		const time = color.white('[' + new Date().toLocaleString() + '] ')
		const typeColor =
			type === 'DEB'
				? color.rainbow
				: type === 'OKAY'
				? color.green
				: type === 'ERR'
				? color.red
				: type === 'WARN'
				? color.yellow
				: type === 'INFO'
				? color.cyan
				: color.blue

		console.log(
			`${time}${typeColor(
				type === 'ERR' ? 'ERR ' : type === 'DEB' ? 'DEB ' : type
			)} ${color.white(from)}: ${message}`
		)
	}

	static logToFile(message: string, type: Type, from: string): void {
		const time = new Date().toLocaleString()
		let msg = `[${time}] [${type} - ${from}]: ${message}`

		if (!this.firstLogTime) {
			this.firstLogTime = new Date()
				.toLocaleString()
				.replace(/\//g, '-')
				.replace(', ', ' | ')
		}

		// Check if logs folder exists and create it if not
		if (!fs.existsSync(path.join(__dirname, '..', 'storage', 'logs'))) {
			fs.mkdirSync(path.join(__dirname, '..', 'storage', 'logs'))
		}

		fs.appendFile(
			path.join(__dirname, '..', 'storage', 'logs', this.firstLogTime + '.txt'),
			msg + '\n',
			err => {
				if (err) {
					this.log(JSON.stringify(err), 'ERR', 'LOGGER')
				} else {
					if (type === 'ERR') {
						fs.copyFile(
							path.join(
								__dirname,
								'..',
								'storage',
								'logs',
								this.firstLogTime + '.txt'
							),
							path.join(
								__dirname,
								'..',
								'storage',
								'logs',
								'errors',
								this.firstLogTime + '.txt'
							),
							err => {
								if (err) {
									this.log(JSON.stringify(err), 'ERR', 'LOGGER')
								}
							}
						)
					}
				}
			}
		)
	}
}
