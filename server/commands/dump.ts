import { Client, Interaction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionReplyOptions, CommandInteraction } from "discord.js";
import Command from "../classes/loaders/Command";
import GuildModel from "../database/GuildModel";
import Settings from "../classes/Settings"
import ButtonLoader from "../classes/loaders/ButtonLoader";
import test from "../buttons/deleteMe";

export default new Command(
  {
    name: "dump",
    description: "test",
    group: "developer",

    // functions
    run:  async (client: Client, message) => {
      if (!message) return "Some error occured"
      if (!message.guild) return "Some error occured";
  
      const embed = new EmbedBuilder()
        .setTitle("Dump")
        .setDescription(
          JSON.stringify(ButtonLoader.buttons)
        )
        .setColor(Settings.successColor);
  
      const row = new ActionRowBuilder().addComponents(
        test.builder
      )
  
      // throw new Error("idk")
  
      return {
        embeds: [embed],
        components: [row],
      } as InteractionReplyOptions;
    }
  },
)
