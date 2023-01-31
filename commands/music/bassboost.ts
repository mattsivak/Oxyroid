import Audio from '../../classes/Audio'
import Command from '../../classes/loaders/Command'

export default new Command({
	name: 'bassboost',
	description: 'Bass boost your experience',
	group: 'music',

	options: [
		{
			name: 'bassboost',
			type: 'string',
			description: 'Select what bassboost you want.',
			required: true
		}
	],

	async run(client, interaction) {
		await interaction.deferReply()
		const queue = Audio.player.getQueue(interaction.guildId as string)
		if (!queue || !queue.playing) {
			await interaction.followUp({ content: '❌ | No music is being played!' })
			return false
		}

		let mode = interaction.options.get('bassboost')?.value
		console.log(mode)

		if (!['high', 'medium', 'low', 'off'].includes(mode as string)) {
			await interaction.followUp({
				content: `🚫 | wrong option. You can pick from: high, medium, low and off`
			})
			return false
		}

		queue.setFilters({
			'8D': queue.getFiltersEnabled().includes('8D'),
			'bassboost_low': mode === 'low',
			'bassboost': mode === 'medium',
			'bassboost_high': mode === 'high'
		})

		let icon = ''
		if (mode === 'low') icon = '🔈'
		if (mode === 'medium') icon = '🔉'
		if (mode === 'high') icon = '🔊'
		if (mode === 'off') icon = '🔇'

		await interaction.followUp({
			content: `${icon} | Bass boost switched to **${mode}**`
		})
		return false
	}
})
