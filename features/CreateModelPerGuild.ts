import { Guild } from 'discord.js'
import Feature from '../classes/loaders/Features'
import Logger from '../classes/Logger'
import GuildModel from '../database/GuildModel'

export default new Feature('CreateModelPerGuild', async client => {
	// Fetch all guilds from client
	const guilds = await client.guilds.fetch()

	// Check if all guilds that bot is connected to are in database, if not store them.
	guilds.forEach(guild => {
		const exists = GuildModel.exists({ guildId: guild.id })
		if (exists === null) {
			createGuild(guild.id)
		}
	})

	// Register event listener guildCreate event, and when event is called store new guild in database
	client.on('guildCreate', (guild: Guild) => {
		// Check if guild isn't already in database, if not create record for it
		const exists = GuildModel.exists({ guildId: guild.id })
		if (exists === null) {
			createGuild(guild.id)
		}
	})
})

function createGuild(guildId: string) {
	const newGuild = new GuildModel({
		guildId: guildId
	})

	newGuild.save((err: any) => {
		if (err) {
			Logger.log(
				`Error happened while saving guild with ${guildId} in database: ${err}`,
				'ERR',
				'DB'
			)
		}
	})
}
