import Audio from "../../classes/Audio";
import Command from "../../classes/loaders/Command";

export default new Command({
  name: "pause",
  description: "Pause music",
  group: "music",

  async run(client, interaction) {
    await interaction.deferReply();
    const queue = Audio.player.getQueue(interaction.guildId as string);
    if (!queue || !queue.playing) {
      await interaction.followUp({ content: "❌ | No music is being played!" })
      return false
    };
    queue.setPaused(true);
    await interaction.followUp({ content: "🛑 | Paused music!" });
    return false
  },
})