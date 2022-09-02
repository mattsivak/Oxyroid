import { Client, Interaction, EmbedBuilder } from "discord.js";
import Command from "../classes/loaders/Command";
import GuildModel from "../database/GuildModel";
import Settings from "../classes/Settings"

export default new Command(
  "dump",
  "test",
  async (_client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";
    const guildId = message.guild.id;
    const guild = await GuildModel.findOne({ id: guildId });

    const embed = new EmbedBuilder()
      .setTitle("Dump")
      .setDescription(
        JSON.stringify(guild, null, 2)
      )
      .setColor(Settings.successColor);

    return embed;
  }
)
