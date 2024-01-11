import {
  Client,
  EmbedBuilder,
  InteractionType,
  ChannelType,
  PermissionsBitField
} from 'discord.js';
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
    if (!message) return 'Some error occurred';
    if (!message.guild) return 'Some error occurred';

    if (
      !(message.member?.permissions as Readonly<PermissionsBitField>).has(
        'ManageMessages'
      )
    )
      return "You don't have right permissions to do that.";

    if (message.type !== InteractionType.ApplicationCommand)
      return 'Some error occurred';

    const messageAmount = message.options.get('count');
    if (!messageAmount) return 'Some error occurred';
    if ((messageAmount.value as number) > 100) {
      const embed = new EmbedBuilder()
        .setTitle("Can't delete more than 100 messages")
        .setColor(Settings.colors.warning);

      return embed;
    }

    if (message.channel?.type !== ChannelType.GuildText)
      return 'Some error occurred';

    let messages: any;

    try {
      messages = await message.channel.bulkDelete(
        messageAmount.value as number
      );
    } catch (err: any) {
      if (err.rawError.code === 50034) {
        return "I can't delete messages that are older then 14 days. It is discord's limitation.";
      } else {
        return 'Unknown error occurred.';
      }
    }

    const embed = new EmbedBuilder()
      .setTitle('Clear')
      .setDescription(`Deleted ${messages.size} messages`)
      .setColor(Settings.colors.success);

    return embed;
  }
});
