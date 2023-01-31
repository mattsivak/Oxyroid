import { Client } from 'discord.js'

export default class Feature {
	public run: (client: Client) => void
	public name: string

	constructor(name: string, run: (client: Client) => void) {
		this.name = name
		this.run = run
	}
}
