import { Client, EmbedBuilder, InteractionReplyOptions } from 'discord.js';
import helpCategory from '../buttons/helpCategory';
import Command from '../classes/loaders/Command';
import CommandHandler from '../classes/loaders/CommandLoader';
import Settings from '../classes/Settings';

export default new Command({
	name: 'help',
	description: 'What the hell is this bot?',
	group: 'utility',

	run: async (_client: Client, message) => {
		if (!message) return 'Some error occurred';
		if (!message.guild) return 'Some error occurred';

		const commands: Array<Command> = CommandHandler.Commands;

		const embed = new EmbedBuilder()
			.setTitle('Help - categories')
			.setColor(Settings.successColor);

		commands.forEach(command => {
			embed.addFields({
				name: '**' + command.builder.name + '** - ' + command.options.group,
				value: command.builder.description
			});
		});

		return {
			embeds: [embed]
		} as InteractionReplyOptions;
	}
});
