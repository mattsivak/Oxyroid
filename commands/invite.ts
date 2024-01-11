import {
  Client,
  EmbedBuilder,
} from 'discord.js';
import Command from '../classes/loaders/Command';
import Settings from '../classes/Settings';
export default new Command({
  name: 'invite',
  description: 'Oh you want to invite me?',
  group: 'utility',

  // functions
  run: async (_client: Client, message) => {
    if (!message) return 'Some error occurred';
    if (!message.guild) return 'Some error occurred';

    const embed = new EmbedBuilder()
      .setTitle('Invite link')
      .setDescription(
        `[Invite bot](https://discord.com/api/oauth2/authorize?client_id=1016991726935736392&permissions=8&scope=bot%20applications.commands)`
      )
      .setColor(Settings.colors.success);

    return embed;
  }
});
