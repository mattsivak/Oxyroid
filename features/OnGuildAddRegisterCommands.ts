import CommandLoader from '../classes/loaders/CommandLoader'
import Feature from '../classes/loaders/Features'

export default new Feature('OnGuildAddRegisterCommands', client => {
	client.on('guildCreate', async guild => {
		// Register commands on API
		await CommandLoader.registerCommandsOnApiOnSingleGuild(guild.id)
	})
})
