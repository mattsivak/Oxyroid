import {
	Client,
	Interaction,
	EmbedBuilder,
	SlashCommandBuilder,
	APIEmbedField,
	ActionRowBuilder,
	ButtonBuilder,
	InteractionReplyOptions,
	CommandInteraction
} from 'discord.js'
import helpCategory from '../buttons/helpCategory'
import Command from '../classes/loaders/Command'
import CommandHandler from '../classes/loaders/CommandLoader'
import Settings from '../classes/Settings'

export default new Command({
	name: 'help',
	description: 'Shows help message.',
	group: 'utility',

	// functinos
	run: async (client: Client, message) => {
		if (!message) return 'Some error occured'
		if (!message.guild) return 'Some error occured'

		const commands: Array<Command> = CommandHandler.Commands

		let description = ''

		const embed = new EmbedBuilder()
			.setTitle('Help - categories')
			.setColor(Settings.successColor)

		const groups = commands.map((command: Command) => command.options.group)
		const options = commands.map(command => command.options)

		const row = new ActionRowBuilder()
		for (let i = 0; i < options.length; i++) {
			const option = groups[i]

			description += '**' + option.toUpperCase() + '**\n'

			row.addComponents(helpCategory.builder.setCustomId(option.toUpperCase()))
		}

		embed.setDescription(description)

		return {
			embeds: [embed],
			components: [row]
		} as InteractionReplyOptions
	}
})
