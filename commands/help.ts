import { Client, EmbedBuilder, InteractionReplyOptions } from 'discord.js';
import Command from '../classes/loaders/Command';
import CommandHandler from '../classes/loaders/CommandLoader';
import Settings from '../classes/Settings';

export default new Command({
  name: 'help',
  description: 'What the hell is this bot?',
  group: 'utility',

  run: async (_client: Client, message) => {
    if (!message) return 'Some error occurred';
    if (!message.guild) return 'Some error occurred';

    const commands: Array<Command> = CommandHandler.Commands;

    const embed = new EmbedBuilder()
      .setTitle('Help - commands')
      .setColor(Settings.colors.success);

    const commands_parsed = commands.map((command) => {
      return {
        name: "**" + command.options.name.toUpperCase() + "**",
        description: command.options.description,
        group: command.options.group,
        options: command.options.options?.map((option) => {
          return `Name: ${option.name} | Description: ${option.description} | Type: ${option.type} | Required: ${option.required}`
        }).join("\n")
      }
    })

    commands_parsed.forEach(command => {
      embed.addFields([{
        name: command.name,
        value: `
**Description**: ${command.description}
**Group**: ${command.group}
${command.options ? `**Options**:\n ${command.options}` : ""}
`
      }])
    })

    return {
      embeds: [embed]
    } as InteractionReplyOptions;
  }
});
