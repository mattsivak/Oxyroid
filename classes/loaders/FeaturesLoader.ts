import fs from 'fs'
import path from 'path'
import Logger from './../Logger'
import Feature from './Features'
import { Client } from 'discord.js'

export default class FeaturesLoader {
	static Features: Feature[] = []
	static client: Client
	static alreadyLoaded: boolean = false

	// Load features
	static async load(): Promise<void> {
		if (!this.client) {
			Logger.log('No client provided', 'ERR', 'FEATURES')
			return
		}

		if (this.alreadyLoaded) {
			Logger.log('Already loaded', 'WARN', 'FEATURES')
			return
		}

		const dirPath = path.join(__dirname, '../../features')
		const filesList = fs.readdirSync(dirPath)

		for (const file of filesList) {
			if (file.endsWith('.ts')) {
				const module = await import(path.join(dirPath, file))
				FeaturesLoader.Features.push(module.default)
				await module.default.run(FeaturesLoader.client)

				Logger.log(`Loaded feature: ${file}`, 'INFO', 'FEATURES')
			}
		}

		this.alreadyLoaded = true
	}
}
