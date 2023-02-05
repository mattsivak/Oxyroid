import Button from './Button'
import Logger from '../Logger'
import { ButtonInteraction, Client } from 'discord.js'
import fs from 'fs'
import path from 'path'

export default class ButtonLoader {
	static buttons: Button[] = []
	static client: Client | null
	static alreadyLoaded = false

	static async load() {
		if (!this.client) {
			Logger.log('No client provided', 'ERR', 'BUTTONS')
			return
		}

		if (this.alreadyLoaded) {
			Logger.log('Already loaded', 'WARN', 'BUTTONS')
			return
		}

		const dir = path.join(__dirname, '../../buttons')
		const files = fs.readdirSync(dir)

		for (const file of files) {
			if (file.endsWith('.ts')) {
				const module = await import(path.join(dir, file))
				ButtonLoader.buttons.push(module.default)

				Logger.log(`Loaded button: ${file}`, 'INFO', 'BUTTONS')
			}
		}

		this.alreadyLoaded = true
	}

	static registerEventListener() {
		if (!this.client) {
			Logger.log('No client provided', 'ERR', 'BUTTONS')
			return
		}

		ButtonLoader.client?.on('interactionCreate', interaction => {
			if (interaction instanceof ButtonInteraction) {
				const button = ButtonLoader.buttons.find(
					button => button.params.id === interaction.customId
				)
				if (button) {
					button.params.execute(interaction)
				}
			}
		})
	}
}
