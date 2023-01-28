import Audio from "../../classes/Audio";
import Command from "../../classes/loaders/Command";

export default new Command({
  name: "volume",
  description: "Sets volume of player",
  group: "music",

  options: [
    {
      name: "volume",
      type: "number",
      description: "Volume you want",
      required: true,
    },
  ],

  async run(client, interaction) {
    await interaction.deferReply();
    const queue = Audio.player.getQueue(interaction.guildId as string);
    if (!queue || !queue.playing) {
      await interaction.followUp({ content: "❌ | No music is being played!" });
      return false;
    }
    queue.setVolume(interaction.options.get("volume", true).value as number);
    await interaction.followUp({
      content: `🎶 | Volume changed to **${interaction.options.get("volume", true).value as number}%**`,
    });
    return false;
  },
});
