import Audio from '../../classes/Audio'
import Command from '../../classes/loaders/Command'

export default new Command({
  name: 'stop',
  description: 'Stop music',
  group: 'music',

  async run(_client, interaction) {
    await interaction.deferReply()
    const queue = Audio.player.getQueue(interaction.guildId as string)
    if (!queue || !queue.playing) {
      await interaction.followUp({ content: '❌ | No music is being played!' })
      return false
    }
    queue.destroy()
    await interaction.followUp({ content: '🛑 | Stopped music!' })
    return false
  }
})
