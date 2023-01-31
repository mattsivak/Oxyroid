import Audio from '../../classes/Audio'
import Command from '../../classes/loaders/Command'

export default new Command({
	name: '8d',
	description: 'Turn on 8d music filter.',
	group: 'music',

	async run(client, interaction) {
		await interaction.deferReply()
		const queue = Audio.player.getQueue(interaction.guildId as string)
		if (!queue || !queue.playing) {
			await interaction.followUp({ content: '❌ | No music is being played!' })
			return false
		}

		queue.setFilters({
			'8D': !queue.getFiltersEnabled().includes('8D'),
			'bassboost': queue.getFiltersEnabled().includes('bassboost'),
			'bassboost_low': queue.getFiltersEnabled().includes('bassboost_low'),
			'bassboost_high': queue.getFiltersEnabled().includes('bassboost_high')
		})

		await interaction.followUp({
			content: `🎧 | 8d music turned **${
				queue.getFiltersEnabled().includes('8D') ? 'on' : 'off'
			}**`
		})
		return false
	}
})
