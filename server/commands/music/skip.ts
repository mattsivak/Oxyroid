import { Guild, InteractionReplyOptions } from "discord.js";
import Audio from "../../classes/Audio";
import Command from "../../classes/loaders/Command";

export default new Command({
  name: "skip",
  description: "skips current song",
  group: "music",

  async run(client, interaction) {
    await interaction.deferReply();
    const queue = Audio.player.getQueue(interaction.guildId as string);
    if (!queue || !queue.playing) {
      interaction.followUp({ content: "❌ | No music is being played!" })
      return false
    };
    const currentTrack = queue.current;
    const success = queue.skip();
    await interaction.followUp({
        content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
    });

    return false
  },
})