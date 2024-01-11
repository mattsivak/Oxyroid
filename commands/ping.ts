import { Client, EmbedBuilder } from 'discord.js';
import Command from '../classes/loaders/Command';
import ping from 'ping';
import Settings from '../classes/Settings';
export default new Command({
  name: 'ping',
  description: "What's the ping?",
  group: 'misc',

  // functions
  run: async (client: Client, message) => {
    if (!message) return 'Some error occurred';
    if (!message.guild) return 'Some error occurred';

    const resultOfPing = await ping.promise.probe('mongodb.com');

    const embed = new EmbedBuilder()
      .setTitle('Ping')
      .setDescription(
        `API Latency: ${client.ws.ping}ms\n` +
        `DB Latency: ${Math.floor(
          parseFloat(resultOfPing.avg) ||
          (parseFloat(resultOfPing.min) + parseFloat(resultOfPing.max)) / 2
        )}ms`
      )
      .setColor(Settings.colors.success);

    return embed;
  }
});
