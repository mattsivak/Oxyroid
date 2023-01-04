import Audio from "../../classes/Audio";
import Command from "../../classes/loaders/Command";

export default new Command({
  name: "resume",
  description: "Resume music",
  group: "music",

  async run(client, interaction) {
    await interaction.deferReply();
    const queue = Audio.player.getQueue(interaction.guildId as string);
    if (!queue || !queue.playing) {
      await interaction.followUp({ content: "❌ | No music is being played!" })
      return false
    };
    queue.setPaused(false)
    await interaction.followUp({ content: "🟢 | Music resumed!" });
    return false
  },
})