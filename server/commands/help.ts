import { Client, Interaction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../classes/Command";
import CommandHandler from "../classes/CommandLoader"

export default new Command(
  new SlashCommandBuilder().setName("help").setDescription("Prints all commands and corresponding description."),
  async (client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";

    const commands = CommandHandler.Commands
    
    let description = ""

    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setColor("#ff0000");

    commands.forEach(command => {
      description += `**Name**: ${command.builder.name}
                      **Description**: ${command.builder.description}
                      
                      `
    })

    embed.setDescription(description)

    return embed;
  }
)

