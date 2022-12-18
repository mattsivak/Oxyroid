import { Client, Interaction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../classes/loaders/Command";
import CommandHandler from "../classes/loaders/CommandLoader"
import Settings from "../classes/Settings"

export default new Command(
  {
    name: "help",
    description: "Shows help message.",
    group: "utility"
  },
  async (client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";

    const commands = CommandHandler.Commands
    
    let description = ""

    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setColor(Settings.successColor);

    commands.forEach(command => {
      description += `**Name**: ${command.builder.name}
                      **Description**: ${command.builder.description}
                      ${command.options.group !== undefined ? `**Group**: ${command.options.group}` : ""}
                      `
    })

    embed.setDescription(description)

    return embed;
  }
)

