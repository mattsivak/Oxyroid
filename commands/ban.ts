import Command from '../classes/loaders/Command';
export default new Command({
  name: 'ban',
  description: 'You can ban anyone',
  group: 'lol',

  options: [
    {
      name: 'the one',
      type: 'user',
      description: 'lol',
      required: true
    }
  ],

  async run(_client, interaction) {
    const user = interaction.options.getUser('the-one');

    if (!user) return 'There was some error, while fetching user.';

    const member = await interaction.guild?.members.fetch(user?.id);

    member?.kick('test');

    if (!member) return 'There was some error, while fetching member.';

    if (!member.bannable) return "I can't ban this member";

    member?.ban();

    return `${member.nickname || member.displayName
      } has been succesfuly banned.`;
  }
});
