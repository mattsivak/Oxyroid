import { Client, EmbedBuilder, InteractionType, ChannelType } from 'discord.js';
import Command from '../classes/loaders/Command';
import Settings from '../classes/Settings';

export default new Command({
  name: 'clear',
  description: 'Clears given amount of messages',
  group: 'utility',
  options: [
    {
      name: 'count',
      description: 'Count of messages to delete',
      required: true,
      type: 'number'
    }
  ],

  // functions
  run: async (_client: Client, message) => {
    if (!message) return 'Some error occured';
    if (!message.guild) return 'Some error occured';

    if (message.type !== InteractionType.ApplicationCommand)
      return 'Some error occured';

    const messageAmount = message.options.get('count');
    if (!messageAmount) return 'Some error occured';
    if ((messageAmount.value as number) > 100) {
      const embed = new EmbedBuilder()
        .setTitle("Can't delete more than 100 messages")
        .setColor(Settings.warningColor);

      return embed;
    }

    if (message.channel?.type !== ChannelType.GuildText)
      return 'Some error occured';

    let messages: any;

    try {
      messages = await message.channel.bulkDelete(
        messageAmount.value as number
      );
    } catch (err: any) {
      if (err.rawError.code === 50034) {
        return "I can't delete messages that are older then 14 days. It is discord limitation.";
      } else {
        return 'Unknown error occured.';
      }
    }

    const embed = new EmbedBuilder()
      .setTitle('Clear')
      .setDescription(`Deleted ${messages.size} messages`)
      .setColor(Settings.successColor);

    return embed;
  }
});
