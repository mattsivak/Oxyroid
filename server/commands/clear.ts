import { Client, Interaction, EmbedBuilder, InteractionType, ChannelType } from "discord.js";
import Command from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';

const slash = new SlashCommandBuilder().setName("clear").setDescription("Clear current channel messages")

slash.addNumberOption(option => {
  return option.setName("amount").setDescription("Amount of messages to delete");
})

export default new Command(
  slash,
  async (_client: Client, message: Interaction) => {


    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";

    if (message.type !== InteractionType.ApplicationCommand) return "Some error occured";

    const messageAmount = message.options.get("amount");
    if (!messageAmount) return "Some error occured";

    if (message.channel?.type !== ChannelType.GuildText) return "Some error occured";

    await message.channel.bulkDelete(messageAmount.value as number);


    const embed = new EmbedBuilder()
      .setTitle("Clear")
      .setColor("#ff0000");

    return embed;
  }
)
