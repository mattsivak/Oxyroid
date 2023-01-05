import { QueryType } from "discord-player";
import { ApplicationCommand, CacheType, Client, CommandInteraction, CommandInteractionOption, Guild, GuildMember, Interaction, MessageInteraction, VoiceBasedChannel, VoiceState } from "discord.js";
import Audio from "../../classes/Audio";
import Data from "../../classes/Data";
import Command from "../../classes/loaders/Command";
import Logger from "../../classes/Logger";
import playdl from "play-dl"
import { internal } from "@discord-player/extractor";

export default new Command({
  name: "play",
  description: "Plays music",
  group: "music",

  options: [
    {
      type: "string",
      name: "query",
      description: "query",
      required: true
    }
  ],

  async run(client: Client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return { content: "You are not in a voice channel!", ephemeral: true };
    }

    if (interaction.guild?.members.me?.voice.channelId && interaction.member.voice.channelId !== interaction.guild?.members.me?.voice.channelId) {
      return { content: "You are not in my voice channel!", ephemeral: true };
    }

    await interaction.deferReply();

    const query = (interaction.options.get("query") as CommandInteractionOption<CacheType>).value as string;
    const searchResult = await Audio.player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      })
      .catch(() => { });
    if (!searchResult || !searchResult.tracks.length) return { content: "No results were found!" };



    const queue = Audio.player.createQueue(interaction.guild as Guild, {
      metadata: interaction.channel,


      // @ts-ignore
      async onBeforeCreateStream(track, source, _queue) {
        console.log(source);
        // only trap youtube source
        if (source === "youtube") {
          // track here would be youtube track
          return (await playdl.stream(track.url, { discordPlayerCompatibility: true })).stream;
          // we must return readable stream or void (returning void means telling discord-player to look for default extractor)
        }
      }
    });

    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      Audio.player.deleteQueue(interaction.guildId as string);
      return { content: "Could not join your voice channel!" };
    }

    await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();

    return false
  }
})